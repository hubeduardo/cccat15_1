import pgp from "pg-promise";
import { IDbConnection } from "./IDbConnection";

export class DbConnection implements IDbConnection {
    getConnection() {
        return pgp()("postgres://postgres:123456@localhost:5432/app");
	}
}