
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const visita = Convert.toVisita(json);

export interface IVisita {
    id?: string,
    apellido:  string;
    categoria: string;
    dni:       string;
    motivo:    string;
    nombre:    string;
    sexo:      string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): IVisita[] {
        return JSON.parse(json);
    }

    public static toJson(value: IVisita[]): string {
        return JSON.stringify(value);
    }
}
