import { AutoMap } from "@automapper/classes";
import { DelegacionDto } from "./delegacion.dto";

export class CompetidorDto {

    @AutoMap()
    ciacodigo: string;

    @AutoMap()
    compid: number;

    @AutoMap()
    compidentificacion: string;

    @AutoMap()
    compapellido: string;

    @AutoMap()
    compnombre: string;

    @AutoMap()
    compfecnac: Date;

    @AutoMap()
    compsexo: string;

    @AutoMap()
    delegaid: number;

    @AutoMap()
    compstatus: string;

    @AutoMap()
    compprov: string;

    @AutoMap()
    compciudad: string;

    @AutoMap()
    compdireccion: string;

    @AutoMap()
    comptelefono: string;

    @AutoMap()
    compmail: string;

    @AutoMap()
    compocupacion: string;

    @AutoMap()
    compinstruccion: string;

    @AutoMap()
    comppeso: number;

    @AutoMap()
    compestatura: number;

    @AutoMap()
    loccodigo: string;

    @AutoMap()
    compstatus2: string;

    @AutoMap()
    reprenombre: string;

    @AutoMap()
    repretelefono: string;

    @AutoMap()
    repremail: string;
    
    @AutoMap()
    delegacion: DelegacionDto;

    @AutoMap()
    deleganombre?: string;

    perfil: number

    compnombrecompleto: string;

    compfecnacstr: string;

    compedad: number;
}