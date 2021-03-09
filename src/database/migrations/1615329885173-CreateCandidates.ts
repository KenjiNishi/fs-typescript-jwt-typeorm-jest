import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCandidates1615329885173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'candidates',
            columns: [
                {name:'id', type:'uuid',isPrimary: true},
                {name: 'name', type:'varchar'},
                {name: 'email', type:'varchar', isUnique:true},
                {name: 'linkedin', type:'varchar'},
                {name: "dob", type:'date'},
                {name: 'techs', type:'varchar'},
                {name: "createdAt", type:"timestamp", default:"now()"}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("candidates");
    }

}
