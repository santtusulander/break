import {MigrationInterface, QueryRunner} from "typeorm";

export class Tables1622489438143 implements MigrationInterface {
    name = 'Tables1622489438143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "club" ("id" character varying NOT NULL, "name" character varying NOT NULL, "streetAddress" character varying NOT NULL, "city" character varying NOT NULL, "postCode" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "faxNumber" character varying NOT NULL, "email" character varying NOT NULL, "drivingInstructions" character varying NOT NULL, "requiredHcp" integer NOT NULL, "status" character varying NOT NULL, "abbreviation" character varying NOT NULL, CONSTRAINT "PK_79282481e036a6e0b180afa38aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hole" ("id" character varying NOT NULL, "holeStatus" character varying NOT NULL, "holeUpdateDate" character varying NOT NULL, "holeNumber" integer NOT NULL, "strokeHCP" integer NOT NULL, "holePar" integer NOT NULL, "holeHCP" integer NOT NULL, "holeTees" jsonb NOT NULL, "courseId" character varying, CONSTRAINT "PK_a56446893c277867f554cd5ae0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "courseVersion" character varying NOT NULL, "courseStatus" character varying NOT NULL, "courseType" character varying NOT NULL, "coordinates" character varying NOT NULL, "courseName" character varying NOT NULL, "holesCount" integer NOT NULL, "clubId" character varying, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "gender" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "fullName" character varying NOT NULL, "hcp" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "clubId" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "round" ("id" SERIAL NOT NULL, "currentHole" integer NOT NULL, "holes" jsonb NOT NULL, "startHole" integer NOT NULL, "complete" boolean NOT NULL DEFAULT false, "endHole" integer NOT NULL, "mensTee" character varying NOT NULL, "womensTee" character varying NOT NULL, "courseId" character varying, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hole_score" ("id" SERIAL NOT NULL, "strokes" integer NOT NULL, "holeNumber" integer NOT NULL, "playerId" character varying, "roundId" integer, CONSTRAINT "UQ_cc45a6953447efb00d03b0cbfdf" UNIQUE ("playerId", "roundId", "holeNumber"), CONSTRAINT "PK_c4f559d455fa99dd20a14d49354" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_rounds_round" ("userId" character varying NOT NULL, "roundId" integer NOT NULL, CONSTRAINT "PK_cdaa05f3c37fdee75f56e045a13" PRIMARY KEY ("userId", "roundId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7202ca3d00f54a4bb9ea2778f6" ON "user_rounds_round" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4eada73f2ea00bb934011497c9" ON "user_rounds_round" ("roundId") `);
        await queryRunner.query(`ALTER TABLE "hole" ADD CONSTRAINT "FK_fc1d059e3504a4f2bee60ae00f9" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_c7eb2720f631f136e3c207bd02a" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9bf449f75aa016d6fcf8230f159" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_8e2c07ec655ad4ebeeec9dc53b4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hole_score" ADD CONSTRAINT "FK_c6f2f935bcee8c4322fe8b81c9a" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hole_score" ADD CONSTRAINT "FK_93fa59d71fd9331c21dc3f76a49" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds_round" ADD CONSTRAINT "FK_7202ca3d00f54a4bb9ea2778f67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds_round" ADD CONSTRAINT "FK_4eada73f2ea00bb934011497c97" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_rounds_round" DROP CONSTRAINT "FK_4eada73f2ea00bb934011497c97"`);
        await queryRunner.query(`ALTER TABLE "user_rounds_round" DROP CONSTRAINT "FK_7202ca3d00f54a4bb9ea2778f67"`);
        await queryRunner.query(`ALTER TABLE "hole_score" DROP CONSTRAINT "FK_93fa59d71fd9331c21dc3f76a49"`);
        await queryRunner.query(`ALTER TABLE "hole_score" DROP CONSTRAINT "FK_c6f2f935bcee8c4322fe8b81c9a"`);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_8e2c07ec655ad4ebeeec9dc53b4"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9bf449f75aa016d6fcf8230f159"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_c7eb2720f631f136e3c207bd02a"`);
        await queryRunner.query(`ALTER TABLE "hole" DROP CONSTRAINT "FK_fc1d059e3504a4f2bee60ae00f9"`);
        await queryRunner.query(`DROP INDEX "IDX_4eada73f2ea00bb934011497c9"`);
        await queryRunner.query(`DROP INDEX "IDX_7202ca3d00f54a4bb9ea2778f6"`);
        await queryRunner.query(`DROP TABLE "user_rounds_round"`);
        await queryRunner.query(`DROP TABLE "hole_score"`);
        await queryRunner.query(`DROP TABLE "round"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "hole"`);
        await queryRunner.query(`DROP TABLE "club"`);
    }

}
