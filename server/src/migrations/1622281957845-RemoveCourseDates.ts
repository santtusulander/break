import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCourseDates1622281957845 implements MigrationInterface {
    name = 'RemoveCourseDates1622281957845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "updateDate"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "effectiveDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "effectiveDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD "updateDate" character varying NOT NULL`);
    }

}
