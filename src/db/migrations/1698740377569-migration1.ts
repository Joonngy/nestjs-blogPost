import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11698740377569 implements MigrationInterface {
    name = 'Migration11698740377569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "commentBlogId" integer NOT NULL, "commentAuthorId" integer NOT NULL, "commentAttachmentId" integer, CONSTRAINT "REL_79837dc01dbeb071aa0180b9e4" UNIQUE ("commentAttachmentId"), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(30) NOT NULL, "userName" character varying(60) NOT NULL, "password" character varying(90) NOT NULL, "avatarId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer NOT NULL, "status" character varying NOT NULL, "content" character varying NOT NULL, "originalName" text DEFAULT '[]', "savedPath" text DEFAULT '[]', CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_category" ("blog_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_8bd634056034f7a0e0e6c4f81ff" PRIMARY KEY ("blog_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_536a95ea52b7b8b6a59c031ce7" ON "blog_category" ("blog_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2479a774f2c6d20cbc81d97851" ON "blog_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b6c6b48557c8835f771a46bb9be" FOREIGN KEY ("commentBlogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_0ca48c41493e2076643f7c2433b" FOREIGN KEY ("commentAuthorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_79837dc01dbeb071aa0180b9e4c" FOREIGN KEY ("commentAttachmentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_category" ADD CONSTRAINT "FK_536a95ea52b7b8b6a59c031ce72" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_category" ADD CONSTRAINT "FK_2479a774f2c6d20cbc81d97851a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_category" DROP CONSTRAINT "FK_2479a774f2c6d20cbc81d97851a"`);
        await queryRunner.query(`ALTER TABLE "blog_category" DROP CONSTRAINT "FK_536a95ea52b7b8b6a59c031ce72"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_79837dc01dbeb071aa0180b9e4c"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_0ca48c41493e2076643f7c2433b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b6c6b48557c8835f771a46bb9be"`);
        await queryRunner.query(`DROP INDEX "IDX_2479a774f2c6d20cbc81d97851"`);
        await queryRunner.query(`DROP INDEX "IDX_536a95ea52b7b8b6a59c031ce7"`);
        await queryRunner.query(`DROP TABLE "blog_category"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
