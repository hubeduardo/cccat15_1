export class Account {
    id?: string;
    name: string;
    email: string;
    cpf: string;
    carPlate: string;
    isPassenger: boolean;
    isDriver: boolean;

    constructor(id: string, name: string, email: string,  cpf: string, carPlate: string, isPassenger: boolean, isDriver: boolean) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.carPlate = carPlate;
        this.isPassenger = isPassenger;
        this.isDriver = isDriver;
    }
}