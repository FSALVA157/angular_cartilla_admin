
export class UserModel{
    nombre: string;
    correo: string;
    password: string;

    
    constructor(nombre: string, correo: string, pass: string){
        this.correo = correo;
        this.nombre = nombre;
        this.password = pass;
    }

}