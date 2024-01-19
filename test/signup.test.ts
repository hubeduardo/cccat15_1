import { AccountDAO } from '../src/Dao/AccountDAO';
import { DbConnectionFake } from '../src/postgreFake/DbConnectionFake';
import { AccountService } from '../src/signup';
const user = {
	name: 'No One',
	email: '',
	cpf: `91092457070`,
	carPlate: 'ABC9999',
	isPassenger: true,
	isDriver: false
}
describe('AccountService', () => {
	let accountService: AccountService;
	let databaseConnection: DbConnectionFake;
	let accountDAO: AccountDAO;
	beforeEach(() => {
		databaseConnection = new DbConnectionFake();
		accountDAO = new AccountDAO(databaseConnection);
		accountService = new AccountService(databaseConnection, accountDAO);
	});	
	test("Deve registrar user: %s", async function () {	
		const updatedUser = { ...user, email: `teste${Math.random() * 100}@teste.com` };
		const account = await accountService.signup(updatedUser);
		expect(account).toHaveProperty('accountId')
	});
	test("Deve invalidar email ja existe: %s", async function () {
		const updatedUser = { ...user, email: `teste${Math.random() * 100}@teste.com` };
		const account = await accountService.signup(updatedUser);
		expect(account).toHaveProperty('accountId')
		const mesmoMail = await accountService.signup(updatedUser);
		expect(mesmoMail).toBe(-4)
	});
	test("Deve invalidar nome invalido: %s", async function () {
		const updatedUser = { ...user, email: `teste${Math.random() * 100}@teste.com`, name: 'teste' };
		const account = await accountService.signup(updatedUser);
		expect(account).toBe(-3)
	});
	test("Deve invalidar email invalido: %s", async function () {
		const updatedUser = { ...user, email: `teste.com` };
		const account = await accountService.signup(updatedUser);
		expect(account).toBe(-2)
	});
	test("Deve invalidar cpf invalido: %s", async function () {
		const updatedUser = { ...user, cpf: `111111`, email: `teste${Math.random() * 100}@teste.com` };
		const account = await accountService.signup(updatedUser);
		expect(account).toBe(-1)
	});
	test("Deve invalidar placa do carro invalido: %s", async function () {
		const updatedUser = { ...user, isDriver: true, carPlate: `111111`, email: `teste${Math.random() * 100}@teste.com` };
		const account = await accountService.signup(updatedUser);
		expect(account).toBe(-5)
	});
})