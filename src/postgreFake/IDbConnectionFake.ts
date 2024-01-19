import { IDatabase } from "pg-promise";

export interface IDbConnectionFake {
    getConnection(): IDatabase<any>;
}