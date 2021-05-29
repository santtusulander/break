import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCourseCreateDate1622281902741 implements MigrationInterface {
    name = 'RemoveCourseCreateDate1622281902741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "createDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "createDate" character varying NOT NULL`);
    }

}
