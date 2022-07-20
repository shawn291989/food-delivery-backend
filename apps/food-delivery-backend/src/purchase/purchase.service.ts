import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseRepository } from './purchase.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { RestaurantRepository } from '../restaurents/restaurants.repository';
import { MenuRepository } from '../restaurents/menu/menu.repository';
import { InventoryRepository } from '../restaurents/inventory/inventory.repository';

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

  //this function performs a full purchase cycle
  async purchase(
    purchaseDto: PurchaseDto
  ) {

    //get user unique id by name
    const userId = await this.userRepository.getUserIdByUserName(
      purchaseDto.name
    );

    //get restaurant unique id by user's provided restaurant name
    const restaurantId = await this.restaurantRepository.getRepoIdByRepoName(
      purchaseDto.restaurantName
    );

    //get dish id from user's provided dish name
    const dishId = await this.menuRepository.getDishIdByDishName(
      purchaseDto.dishName
    );

    //get restaurant id by dish id from menu table, purpuse is to verify (later) the item availabe/not availabe on that restaturant
    const restaurantIdFromMenu = await this.menuRepository.getResIdByDishId(
      dishId
    );

    //get restaurant id by dish id from menu table, purpuse is to verify (later) the 
    const restaurantNameByDishId = await this.restaurantRepository.getRestaurantById(
      restaurantIdFromMenu[0].menu_restaurantId
    );

    //if id not same, means this menu/dish item is not availabe at this restaurant
    if (restaurantIdFromMenu[0].menu_restaurantId !== restaurantId) {
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

    //checking user's given amount is equal to dish's price (If more or less, User gets a message from else clause)
    if (dishPrice === purchaseDto.transactionAmount) {

      try {

        //this function updates/adds restaurant's total cash balance as a user purchase a dish and make a payment
        const restaurantCashBalanceUpdate = await this.restaurantRepository.updateRestaurantCashBalance(
          restaurantId,
          restaurantCashBalance,
          purchaseDto.transactionAmount
        );


        //this function updates/deducts user's total cash balance as user purchase an item
        const userCashBalanceUpdated = await this.userRepository.updateUserCashBalance(
          userId,
          userCashBalance,
          purchaseDto.transactionAmount
        );

        //this function updates inventory number (As user purchase a dish, inventory duducted by 1)
        const availableInventoryUpdated = await this.inventoryRepository.updateDishInventory(dishId, dishInventory);

        //this function inserts payment history as a successfull payment happend
        const purchaseData = await this.purchaseRepository.purchase(purchaseDto);

        const purchaseResponse = {
          userName: purchaseDto.name,
          dishName: purchaseData.dishName,
          availabeInventory: availableInventoryUpdated.newInventory,
          restaurantName: purchaseData.restaurantName,
          transactionAmount: purchaseData.transactionAmount,
          userCashBalance: userCashBalanceUpdated.newBalance,
          restaurantCashBalance: restaurantCashBalanceUpdate.newBalance,
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

