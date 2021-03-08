import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async () : Promise<Connection> =>{
    const ormconfig = await getConnectionOptions();
    
    return createConnection(
        Object.assign(ormconfig, {
            database: 
                process.env.NODE_ENV === 'test' 
                    ? "./src/database/database.test.sqlite" 
                    : ormconfig.database,
        })
    );
}