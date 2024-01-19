import { Account } from "../Entity/Account";
import { IDbConnection } from "../postgree/IDbConnection";
import { IAccountDAO } from "./IAccountDAO";

export class AccountDAO implements IAccountDAO {
    constructor(readonly dbConnection: IDbConnection) {
    }	
    async save(account: Account): Promise<any> {
        const connection = this.dbConnection.getConnection();
        await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [account.id, account.name, account.email, account.cpf, account.carPlate, account.isPassenger, account.isDriver]);
        await connection.$pool.end();
    }
    async getByMail(accountId: string): Promise<any> {
        const connection = this.dbConnection.getConnection();
        const account = await connection.query("select * from cccat15.account where email = $1", [accountId]);
        await connection.$pool.end();
        return account;
    }
}