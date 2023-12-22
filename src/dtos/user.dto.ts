import { AutoMap } from "@automapper/classes";

export class UserDto {

    @AutoMap()
    ciacodigo: string; 
    
    @AutoMap()
    usercodigo: string; 
    
    @AutoMap()
    usernombre: string; 
    
    @AutoMap()
    userstatus: string; 
    
    @AutoMap()
    usercodper: string; 
    
    @AutoMap()
    userflagperfil: number; 
    
    @AutoMap()
    useremail: string;
}
