import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRecruiters1615237395847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'recruiters',
            columns: [
                {name:'id', type:'uuid',isPrimary: true},
                {name: 'email', type:'varchar', isUnique:true},
                {name: 'password', type:'varchar'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recruiters");
    }

}
