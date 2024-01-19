import pgp from "pg-promise";
import { IDbConnectionFake } from "./IDbConnectionFake";

export class DbConnectionFake implements IDbConnectionFake {
    getConnection() {
        return pgp()("postgres://postgres:123456@localhost:5432/app");
	}
}