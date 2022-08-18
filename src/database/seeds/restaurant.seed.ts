import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getConnection, getRepository } from 'typeorm';
import { Restaurant } from '../../restaurents/entities/restaurants.entity';
import * as restaurants from '../data/restaurant-data.json';
import { stringify } from 'querystring';
import { Menu } from '../../restaurents/menu/entities/menu.entity';
import { RestaurantService } from '../../restaurents/restaurants.service'
import { RestaurantRepository } from '../../restaurents/restaurants.repository';
import { InjectRepository } from '@nestjs/typeorm';

export default class CountrySeed implements Seeder {
  constructor(
    @InjectRepository(RestaurantRepository)
    private restauranRepository: RestaurantRepository) { }
  public async run(factory: Factory, connection: Connection): Promise<any> {

    await Promise.all(
      restaurants.map(async (item) => {
        const outString = item.restaurantName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        const restaurant = {
          restaurantName: outString,
          cashBalance: item.cashBalance,
        };
        await connection
          .createQueryBuilder()
          .insert()
          .into(Restaurant)
          .values(restaurant)
          .execute();

      }),
    );
  }
}
