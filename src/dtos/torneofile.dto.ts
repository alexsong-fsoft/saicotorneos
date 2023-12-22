
import { AutoMap } from "@automapper/classes";

export class TorneoFileDto {

    @AutoMap()
    ID: number;
    
    @AutoMap()
    ciacodigo: string;
    
    @AutoMap()
    loccodigo: string;
    
    @AutoMap()
    torneoid: number;
    
    FileContent: Buffer;
    
    @AutoMap()
    MimeType: string;
    
    @AutoMap()
    FileName: string;
    
    @AutoMap()
    tipo: string;
    
    // torneo: Torneo;
}
