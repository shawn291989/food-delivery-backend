import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserEntity1660762807986 implements MigrationInterface {
    name = 'updateUserEntity1660762807986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
