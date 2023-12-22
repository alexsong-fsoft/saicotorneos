import { CompaniaDto } from "../dtos";
import { Compania } from "../entities";
import { mapper } from "../mappings/mapper";
import * as congeneralRepository from "../repositories/congeneral.repository"

export const getCompaniaById = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    const entity: Compania | null = await congeneralRepository.getCompaniaById(ciacodigo);
    const response: CompaniaDto = mapper.map(entity, Compania, CompaniaDto);
    return response;
}
