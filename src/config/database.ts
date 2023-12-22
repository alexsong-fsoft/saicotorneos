import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";


   export const AppDataSource: DataSource = new DataSource({
        type: "mssql",
        host: process.env.DB_MSSQL_HOST,
        port: Number(process.env.DB_MSSQL_PORT) || 14666,
        username: process.env.DB_MSSQL_USERNAME,
        password: process.env.DB_MSSQL_PASSWORD,
        database: process.env.DB_MSSQL_DATABASE,
        // synchronize: true,
        logging: true,
        entities: [
            path.resolve(__dirname, "../entities/*.js")
        ],
        subscribers: [],
        migrations: [],
        extra: {
            // driver: sqlDriver,
            options: {
                trustServerCertificate: true,
                trustedConnection: true
            }
        }
    });

    AppDataSource.initialize()
    .then(() => {
        console.log(`Conexiones Creadas MSSQL: ${process.env.DB_MSSQL_DATABASE}`);
    })
    .catch((error) => console.log(error))


// export class DbConnection {

//     public AppDataSource: DataSource = new DataSource({
//         type: "mssql",
//         host: process.env.DB_MSSQL_HOST,
//         port: Number(process.env.DB_MSSQL_PORT) || 14666,
//         username: process.env.DB_MSSQL_USERNAME,
//         password: process.env.DB_MSSQL_PASSWORD,
//         database: process.env.DB_MSSQL_DATABASE,
//         // synchronize: true,
//         logging: true,
//         entities: [
//             path.resolve(__dirname, "../entities/*.js")
//         ],
//         subscribers: [],
//         migrations: [],
//         extra: {
//             // driver: sqlDriver,
//             options: {
//                 trustServerCertificate: true,
//                 trustedConnection: true
//             }
//         }
//     });

//     dbConnectionMssql() {
//         try {
//             this.AppDataSource.initialize()
//             .then(() => {
//                 console.log(`Conexiones Creadas MSSQL: ${process.env.DB_MSSQL_DATABASE}`);
//             })
//             .catch((err) => {
//                 console.error("Error during Data Source initialization", err)
//             });
//         } catch (error) {
//             console.log(error);
//             throw Error('Error al conectar con la BD Mssql')
//         }
    
//     }
// }