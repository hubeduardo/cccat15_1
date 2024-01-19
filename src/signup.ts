import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import { IDbConnection } from "./postgree/IDbConnection";
import { IAccountDAO } from "./Dao/IAccountDAO";


export class AccountService {
    constructor(readonly dbConnection: IDbConnection, readonly accountDAO: IAccountDAO) {
    }	
    async signup(input: any): Promise<any> {
        const accountId = crypto.randomUUID();
		const [acc] = await this.accountDAO.getByMail(input.email);
		if (acc) return -4;
		if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) return -3;
		if (!input.email.match(/^(.+)@(.+)$/)) return -2;
		if (!validateCpf(input.cpf)) return -1;
		if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) return -5;	
		const account = {
           id: accountId, 
           name: input.name, 
           email: input.email, 
           cpf: input.cpf, 
           carPlate: input.carPlate, 
           isPassenger: !!input.isPassenger, 
           isDriver: !!input.isDriver
        }
        await this.accountDAO.save(account);
		return { accountId };
        
    }
}