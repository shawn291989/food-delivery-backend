import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseRepository } from './purchase.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { RestaurantRepository } from '../restaurents/restaurants.repository';
import { MenuRepository } from '../restaurents/menu/menu.repository';
import { InventoryRepository } from '../restaurents/inventory/inventory.repository';
import * as moment from 'moment'
import { NotFoundException } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseRepository)
    private purchaseRepository: PurchaseRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,
    @InjectRepository(MenuRepository)
    private menuRepository: MenuRepository,
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,
  ) { }

  //This whole block performs a full purchase cycle
  //Atomic transection implemented

  async purchase(
    purchaseDto: PurchaseDto
  ) {

    //get user unique id by name
    const userId = await this.userRepository.getUserIdByUserName(
      purchaseDto.name
    );

    //get restaurant unique id by user's provided restaurant name
    let restaurantId; let errorMessage;
    (userId) ? restaurantId = await this.restaurantRepository.getRepoIdByRepoName(
      purchaseDto.restaurantName
    ) : errorMessage = 'User not found!'
    if (errorMessage) {
      throw new NotFoundException(errorMessage)
    }

    //get dish id from user's provided dish name
    const dishId = await this.menuRepository.getDishIdByDishName(
      purchaseDto.dishName
    );

    //get restaurant id by dish id from menu table, purpuse is to verify (later) the item availabe/not availabe on that restaturant
    let restaurantIdFromMenuEntity;
    (dishId) ? restaurantIdFromMenuEntity = await this.menuRepository.getResIdByDishId(
      dishId
    ) : errorMessage = 'Item not availabe!'

    if (errorMessage) {
      throw new NotFoundException(errorMessage)
    }

    //get restaurant id by dish id from menu table, purpuse is to verify (later) the 
    const restaurantNameByDishId = await this.restaurantRepository.getRestaurantById(
      restaurantIdFromMenuEntity[0].menu_restaurantId
    );

    //if id not same, means this menu/dish item is not availabe at this restaurant
    if (restaurantIdFromMenuEntity[0].menu_restaurantId !== restaurantId) {
      throw new BadRequestException(
        `This item ` + purchaseDto.dishName + ' is not availabe at ' + purchaseDto.restaurantName + ' The item availabe at ' + restaurantNameByDishId.restaurantName,
      );
    }

    //get dish inventory in number by dish id
    const dishInventory = await this.inventoryRepository.getDishInventoryByDishId(dishId)

    //get dish price by dish id
    const dishPrice = await this.menuRepository.getPriceById(dishId);

    //assigning value
    purchaseDto.userId = userId;
    purchaseDto.restaurantId = restaurantId;

    //get Restaurant's cash balance by id
    const restaurantCashBalance = await this.restaurantRepository.getCashBalanceById(
      restaurantId
    );

    //get user's cash balance by id
    const userCashBalance = await this.userRepository.getCashBalanceByUserId(userId);

    //check inventory is not empty/0
    if (dishInventory <= 0) {
      throw new BadRequestException(
        `This item ` + purchaseDto.dishName + ' is not availabe !!!',
      );
    }

    //check user has sufficient balance
    if (dishPrice > userCashBalance) {
      throw new BadRequestException(
        `User has no sufficient balance, current balance ` + userCashBalance + ' required Balance ' + dishPrice,
      );
    }

    //Checking user's given amount is equal to dish's price (If more or less, User gets a message from else clause)
    if (dishPrice === purchaseDto.transactionAmount) {

      try {

        //Following block updates/adds restaurant's total cash balance as a user purchase a dish and make a payment

        const restaurantDATA = await this.restaurantRepository.getRestaurantById(restaurantId);
        const convertedCurrentBalance: number = +restaurantCashBalance;
        const newBalance = convertedCurrentBalance + purchaseDto.transactionAmount;
        restaurantDATA.cashBalance = newBalance;

        //Following block updates/deducts user's total cash balance as user purchase an item

        const userDATA = await this.userRepository.getUserById(userId);
        const convertedUserBalance: number = +userCashBalance;
        const amountForTransection = purchaseDto.transactionAmount;
        if (convertedUserBalance < amountForTransection) {
          throw new BadRequestException(
            `Insufficient user balance.`,
          );
        }
        const newUserBalance = convertedUserBalance - amountForTransection;
        userDATA.cashBalance = newUserBalance;

        //this block updates inventory number (As user purchase a dish, inventory duducted by 1)
        const inventories = await this.inventoryRepository.getInventoryById(dishId);
        const newInventory = dishInventory - 1;
        inventories.inventory = newInventory;

        //this function inserts payment history as a successfull payment happend
        const dateTime = moment().utc();
        Object.assign(purchaseDto, {
          transactionDate: dateTime
        });

        const purchaseData = await this.purchaseRepository.create(purchaseDto);

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          await this.restaurantRepository.save(restaurantDATA);
          await this.userRepository.save(userDATA);
          await this.inventoryRepository.save(inventories);
          await this.purchaseRepository.save(purchaseData);
          await queryRunner.commitTransaction();
        }
        catch (err) {
          queryRunner.rollbackTransaction();
        }
        finally {
          await queryRunner.release();
        }

        const purchaseResponse = {
          userName: purchaseDto.name,
          dishName: purchaseData.dishName,
          availabeInventory: newInventory,
          restaurantName: purchaseData.restaurantName,
          transactionAmount: purchaseData.transactionAmount,
          userCashBalance: newUserBalance,
          restaurantCashBalance: newBalance,
          transactionDate: purchaseData.transactionDate,
        }
        return Promise.resolve(purchaseResponse)

      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      throw new BadRequestException(
        `The price of this item is, ` + dishPrice + ' please provide the amount instead of ' + purchaseDto.transactionAmount,
      );
    }
  }
}

