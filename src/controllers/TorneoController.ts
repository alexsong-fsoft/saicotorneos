import _ from "lodash";
import { Torneo } from "../entities";
import * as torneoRepository from "../repositories/torneo.repository";
import * as torneofileRepository from "../repositories/torneofile.repository";
import { mapper } from "../mappings/mapper";
import { TorneoCompetidorViewByDelegacionDto, TorneoCompetidorViewByModalidadDto, TorneoCompetidorViewByPosicionesDto, TorneoDto } from "../dtos";

export const getTorneoAndPortadaByCompania = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    let torneos: Torneo[] | null = await torneoRepository.getTorneoAndPortadaByCompania(ciacodigo);
    let response: TorneoDto[] = [];
    if (_.isArray(torneos) && !_.isEmpty(torneos)){
        response = mapper.mapArray(torneos, Torneo, TorneoDto);
        // torneos.map(torneo => torneo.torneofecinicio = torneo.torneofecinicio);
        // torneos = torneos.map(torneo => { return {...torneo, torneofecinicio: new Intl.DateTimeFormat("en-US").format(torneo.torneofecinicio) }});
    }
    return response;
}

export const getTorneoAndPortadaById = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    const torneoid = bodyParams.torneoid;
    let torneo: Torneo | null = await torneoRepository.getTorneoAndPortadaById(ciacodigo, torneoid);
    let response: TorneoDto = new TorneoDto();
    if (!_.isNil(torneo)){
        response = mapper.map(torneo, Torneo, TorneoDto);
    }
    return response;
}

export const getTorneoCompetidorViewRead = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    const loccodigo = bodyParams.loccodigo;
    const torneoid = bodyParams.torneoid;
    const tipoconsulta = bodyParams.tipoconsulta;
    if (tipoconsulta == '3'){
        let response: TorneoCompetidorViewByDelegacionDto[] | null = await torneoRepository.getTorneoCompetidorViewRead({ciacodigo, torneoid, tipoconsulta});
        return response;
    }
    else if (tipoconsulta == '4'){
        let response: TorneoCompetidorViewByModalidadDto[] | null = await torneoRepository.getTorneoCompetidorViewRead({ciacodigo, torneoid, tipoconsulta});
        return response;
    }
    else if (tipoconsulta == '8'){
        let response: TorneoCompetidorViewByPosicionesDto[] | null = await torneoRepository.getTorneoCompetidorViewRead({ciacodigo, loccodigo, torneoid, tipoconsulta});
        console.log('response', response);
        return response;
    }
    return [];
}


export const getTorneoFile = async (
    bodyParams: any
) => {
    if(!bodyParams.id){
        return null;
    }
    let file = await torneofileRepository.getTorneoFileById(bodyParams.id);
    if(!_.isNil(file) && file.length > 0){
        return file[0].FileContent;
    }
    return null;
}
