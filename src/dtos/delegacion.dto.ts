import { AutoMap } from "@automapper/classes";
import { CompetidorDto } from "./competidor.dto";

export class DelegacionDto {

    @AutoMap()
    ciacodigo: string;
    
    @AutoMap()
    delegaid: number;
    
    @AutoMap()
    deleganombre: string;
    
    @AutoMap()
    delegaprov: string;
    
    @AutoMap()
    delegaciudad: string;
    
    @AutoMap()
    delegadireccion: string;
    
    @AutoMap()
    delegatelefono: string;
    
    @AutoMap()
    delegamail: string;
    
    @AutoMap()
    delegauser: string;
    
    @AutoMap()
    delegastatus: string;
    
    @AutoMap()
    delegaalias: string;
    
    delegaredes: string;

    @AutoMap(() => CompetidorDto)
    competidores: CompetidorDto[];
    
    @AutoMap()
    logo: number;
    
    @AutoMap()
    numDeportistas: number;
}