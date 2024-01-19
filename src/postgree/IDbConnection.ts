import { IDatabase } from "pg-promise";

export interface IDbConnection {
    getConnection(): IDatabase<any>;
}