import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1626222614782 implements MigrationInterface {
    name = 'firstMigration1626222614782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "administrador" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "senha" character varying NOT NULL, CONSTRAINT "UQ_264e359a8a02187f46707056db1" UNIQUE ("email"), CONSTRAINT "PK_a84433082c320e8c25abe76c52e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "filmes" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "diretor" character varying NOT NULL, "genero" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_e7531027ca859ab4acb3a313658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "administrador" boolean NOT NULL DEFAULT false, "senha" character varying NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios_filmes" ("id" SERIAL NOT NULL, "nota" integer NOT NULL, "usuario_id" integer, "filme_id" integer, CONSTRAINT "PK_a2a1c0c84ceec820faea1a964e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_fa09482335d5befb89136816dd5" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" ADD CONSTRAINT "FK_2b23debfa1182ba3f95c31c6884" FOREIGN KEY ("filme_id") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_2b23debfa1182ba3f95c31c6884"`);
        await queryRunner.query(`ALTER TABLE "usuarios_filmes" DROP CONSTRAINT "FK_fa09482335d5befb89136816dd5"`);
        await queryRunner.query(`DROP TABLE "usuarios_filmes"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "filmes"`);
        await queryRunner.query(`DROP TABLE "administrador"`);
    }

}
