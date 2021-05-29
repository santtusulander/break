import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCourseIdPK1622273400806 implements MigrationInterface {
    name = 'RemoveCourseIdPK1622273400806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hole" DROP CONSTRAINT "FK_dbb5a4e1ff310f4a6bf8416f5d9"`);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_88880fb8b7785c39a0d3a80f8e7"`);
        await queryRunner.query(`ALTER TABLE "hole" DROP COLUMN "courseCourseId"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "PK_f57ae7dadd1fe4886c1228f1176"`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "courseCourseId"`);
        await queryRunner.query(`ALTER TABLE "hole" ADD CONSTRAINT "FK_fc1d059e3504a4f2bee60ae00f9" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_8e2c07ec655ad4ebeeec9dc53b4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_8e2c07ec655ad4ebeeec9dc53b4"`);
        await queryRunner.query(`ALTER TABLE "hole" DROP CONSTRAINT "FK_fc1d059e3504a4f2bee60ae00f9"`);
        await queryRunner.query(`ALTER TABLE "round" ADD "courseCourseId" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ADD "courseId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "PK_bf95180dd756fd204fb01ce4916"`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "PK_f57ae7dadd1fe4886c1228f1176" PRIMARY KEY ("id", "courseId")`);
        await queryRunner.query(`ALTER TABLE "hole" ADD "courseCourseId" character varying`);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_88880fb8b7785c39a0d3a80f8e7" FOREIGN KEY ("courseId", "courseCourseId") REFERENCES "course"("id","courseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hole" ADD CONSTRAINT "FK_dbb5a4e1ff310f4a6bf8416f5d9" FOREIGN KEY ("courseId", "courseCourseId") REFERENCES "course"("id","courseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
