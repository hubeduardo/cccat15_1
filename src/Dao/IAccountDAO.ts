import { Account } from "../Entity/Account";

export interface IAccountDAO {
     getByMail(accountId: string): Promise<any>;
     save(account: Account): Promise<any>;
}