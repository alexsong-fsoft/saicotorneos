import _ from "lodash";
import { Competidor } from "../entities";
import * as competidorRepository from "../repositories/competidor.repository";
import * as competidorfileRepository from "../repositories/competidorfile.repository";
import { mapper } from "../mappings/mapper";
import { CompetidorDto } from "../dtos";

export const getCompetidorByDelegacion = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    const delegaid = bodyParams.delegaid;
    let competidors: any[] | null = await competidorRepository.getCompetidorAndPerfilByDelegacion(ciacodigo, delegaid);
    let response: CompetidorDto[] = [];
    if (_.isArray(competidors) && !_.isEmpty(competidors)){
        response = mapper.mapArray(competidors, Competidor, CompetidorDto);
    }
    return response;
}

export const getCompetidorByCia = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    let competidors: any[] | null = await competidorRepository.getCompetidorByCia(ciacodigo);
    let response: CompetidorDto[] = [];
    if (_.isArray(competidors) && !_.isEmpty(competidors)){
        response = mapper.mapArray(competidors, Competidor, CompetidorDto);
    }
    return response;
}


export const getCompetidorPerfil = async (
    bodyParams: any
) => {
    if(!bodyParams.id){
        return null;
    }
    let file = await competidorfileRepository.getCompetidorFileById(bodyParams.id);
    if(!_.isNil(file) && file.length > 0){
        return file[0].FileContent;
    }
    return null;
}
