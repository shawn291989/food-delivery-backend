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
import { PurchaseResponseDto } from './dto/purchase.response.dto';

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
  ): Promise<PurchaseResponseDto> {
    if (purchaseDto.quantity <= 0) {
      throw new BadRequestException('Order quantity should be at least 1')
    }
    //get user unique id by name
    const userId = await this.userRepository.getUserIdByUserName(
      purchaseDto.customerName
    );

    //get restaurant unique id by user's provided restaurant name
    let restaurantId; let errorMessage;
    (userId) ? restaurantId = await this.restaurantRepository.getRetaurantIdByName(
      purchaseDto.restaurantName
    ) : errorMessage = 'User not found!'
    if (errorMessage) {
      throw new NotFoundException(errorMessage)
    }

    //get dish id from user's provided dish name
    const dishId = await this.menuRepository.getDishIdByDishNameAndResId(
      purchaseDto.dishName,
      restaurantId
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
      throw new NotFoundException(
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

    //get user's total expences by id
    const userSpentAmount = await this.userRepository.getSpendAmountByUserId(userId);

    //check inventory is not empty/0
    if (dishInventory <= 0) {
      throw new NotFoundException(
        `This item ` + purchaseDto.dishName + ' is not availabe !!!',
      );
    }

    //Checking user's given amount is equal to dish's price (If more or less, User gets a message from else clause)
    if (dishPrice === purchaseDto.unitPrice) {

      try {

        //Following block updates/adds restaurant's total cash balance as a user purchase a dish and make a payment

        const restaurantDATA = await this.restaurantRepository.getRestaurantById(restaurantId);
        const convertedCurrentBalance: number = +restaurantCashBalance;
        const totalTransectionAmount = purchaseDto.unitPrice * purchaseDto.quantity;
        const newBalance = convertedCurrentBalance + totalTransectionAmount;
        restaurantDATA.cashBalance = newBalance;

        //Following block addes user's total expanse as user purchase an item

        const userDATA = await this.userRepository.getUserById(userId);
        const convertedUserSpentAmount: number = +userSpentAmount;
        const transectionAmount = purchaseDto.unitPrice * purchaseDto.quantity;
        const updatedSpentAmount = convertedUserSpentAmount + transectionAmount;
        userDATA.spentAmount = updatedSpentAmount;

        //this block updates inventory number (As user purchase a dish, inventory is duducted)
        if (dishInventory < purchaseDto.quantity) {
          throw new BadRequestException('Item not availabe!S');
        }
        const inventories = await this.inventoryRepository.getInventoryById(dishId);
        const newInventory = dishInventory - purchaseDto.quantity;
        inventories.inventory = newInventory;

        //this function inserts payment history as a successfull payment happend
        const dateTime = moment().utc();
        Object.assign(purchaseDto, {
          transactionDate: dateTime
        });

        const purchaseData = this.purchaseRepository.create(purchaseDto);

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

        const purchaseResponse = {
          restaurantName: purchaseData.restaurantName,
          customerName: purchaseDto.customerName,
          dishName: purchaseDto.dishName,
          purchaseQuantity: purchaseDto.quantity,
          unitPrice: purchaseData.transactionAmount,
          totalPrice: transectionAmount,
          availabeInventory: newInventory,
          restaurantCashBalance: newBalance,
          userTotalSpentAmount: updatedSpentAmount,
          transactionDate: purchaseData.transactionDate,
        }
        return purchaseResponse

      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      throw new NotFoundException(
        `The price of this item is, ` + dishPrice + ' please provide the amount instead of ' + purchaseDto.unitPrice,
      );
    }
  }
}

