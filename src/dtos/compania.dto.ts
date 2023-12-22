import { AutoMap } from "@automapper/classes";

export class CompaniaDto {

    @AutoMap()
    ciacodigo: string;

    @AutoMap()
    ciadescri: string;

    @AutoMap()
    ciaalias: string;

    // @AutoMap()
    param1: any;

    @AutoMap()
    param2: string;

    @AutoMap()
    ciastatus: string;

}


