import {MigrationInterface, QueryRunner} from "typeorm";

export class ClubNameChange1622495336254 implements MigrationInterface {
    name = 'ClubNameChange1622495336254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "club" RENAME COLUMN "name" TO "clubName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "club" RENAME COLUMN "clubName" TO "name"`);
    }

}
