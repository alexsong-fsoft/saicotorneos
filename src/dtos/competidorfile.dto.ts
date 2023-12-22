import { AutoMap } from "@automapper/classes";

export class CompetidorFileDto {

    @AutoMap()
    ID: number; 

    @AutoMap()
    ciacodigo: string; 

    @AutoMap()
    compid: number; 

    FileContent: Buffer;

    @AutoMap()
    MimeType: string; 

    @AutoMap()
    FileName: string; 

}