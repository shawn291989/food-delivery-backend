import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Restaurant } from '../../restaurents/entities/restaurants.entity';
import * as restaurants from '../data/restaurant-data.json';

export default class CountrySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await Promise.all(
      restaurants.map(async (item) => {
        const restaurant = {
          restaurantName: item.restaurantName,
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
