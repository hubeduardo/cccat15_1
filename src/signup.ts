import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

export class DatabaseConnection {
    getConnection() {
        return pgp()("postgres://postgres:123456@localhost:5432/app");
	}
}
export class AccountService {
    private dbConnection: DatabaseConnection;
    constructor(dbConnection: DatabaseConnection) {
        this.dbConnection = dbConnection;
    }	
    async signup(input: any): Promise<any> {
        const connection = this.dbConnection.getConnection();
        try {
        const id = crypto.randomUUID();
		const [acc] = await connection.query("select * from cccat15.account where email = $1", [input.email]);
		if (acc) return -4;
		if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) return -3;
		if (!input.email.match(/^(.+)@(.+)$/)) return -2;
		if (!validateCpf(input.cpf)) return -1;
		if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) return -5;	
		await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
		const obj = { accountId: id };
		return obj;
        } finally {
            await connection.$pool.end();
        }
    }
}