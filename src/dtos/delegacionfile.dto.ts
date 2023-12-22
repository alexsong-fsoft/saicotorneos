
import { AutoMap } from "@automapper/classes";

export class DelegacionFileDto {
    
    @AutoMap() 
    ID: number; 
    
    @AutoMap() 
    ciacodigo: string; 
    
    @AutoMap() 
    delegaid: number; 
    
    FileContent: Buffer;
    
    @AutoMap() 
    MimeType: string; 
    
    @AutoMap() 
    FileName: string; 

}
