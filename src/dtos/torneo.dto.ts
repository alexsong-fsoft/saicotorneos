import { AutoMap } from "@automapper/classes";
import { TorneoFileDto } from "./torneofile.dto";

export class TorneoDto {

    @AutoMap()
    ciacodigo: string;

    @AutoMap()
    loccodigo: string;

    @AutoMap()
    torneoid: number;

    @AutoMap()
    torneonombre: string;

    @AutoMap()
    torneodescri: string;

    @AutoMap()
    torneofecinicio: string;

    @AutoMap()
    torneofecfin: string;

    @AutoMap()
    torneofecmaxins: string;

    @AutoMap()
    torneoprov: string;

    @AutoMap()
    torneociudad: string;

    @AutoMap()
    torneodireccion: string;

    @AutoMap()
    torneotipo: string;

    @AutoMap()
    torneostatus: string;

    @AutoMap()
    torneoorganiza: string;
    
    @AutoMap(() => TorneoFileDto)
    torneoFiles: TorneoFileDto[];

    fullDescri: string;

    portada: number;

}