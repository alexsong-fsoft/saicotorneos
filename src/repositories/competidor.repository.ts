import { AnyNsRecord } from "dns";
import { AppDataSource } from "../config/database";
import { Competidor } from "../entities/segcompetidor.entity";
import { GeneralEnum } from "../helpers/enums/generalEnum";


const getRepository = () => {
    return AppDataSource.getRepository(Competidor);
}

export const getCompetidorByDelegacion = (
    ciacodigo: string,
    delegaid: number,
): Promise<Competidor[] | null>  => {    
    return getRepository().find({
        where: {
            ciacodigo: ciacodigo,
            delegaid: delegaid,
            compstatus: GeneralEnum.Activo,
        },
    })
}


export const getCompetidorAndPerfilByDelegacion = (
    ciacodigo: string,
    delegaid: number,
): Promise<Competidor[] | null>  => {    
    return getRepository().createQueryBuilder('competidor')
        .select('competidor')
        .leftJoinAndSelect('competidor.competidorPerfil', 'competidorPerfil')
        .where('competidor.ciacodigo = :ciacodigo', { ciacodigo })
        .andWhere('competidor.delegaid = :delegaid', { delegaid })
        .andWhere('competidor.compstatus = :compstatus', { compstatus: GeneralEnum.Activo })
        .getMany();
}

export const getCompetidorByCia = (
    ciacodigo: string,
): Promise<any[] | null>  => {    
    let queryBuilder = getRepository().createQueryBuilder('competidor')
        .select('competidor.delegaid', 'delegaid')
        .addSelect('competidor.compnombre', 'compnombre')
        .addSelect('competidor.compapellido', 'compapellido')
        .addSelect('competidor.compidentificacion', 'compidentificacion')
        .addSelect('competidor.compsexo', 'compsexo')
        .addSelect('competidor.compfecnac', 'compfecnac')
        .addSelect('competidor.compstatus', 'compstatus')
        .addSelect('competidor.compstatus2', 'compstatus2')
        .addSelect('delegacion.deleganombre', 'deleganombre')
        .innerJoin('competidor.delegacion', 'delegacion')
        .where('competidor.ciacodigo = :ciacodigo', { ciacodigo })
        .andWhere('competidor.compstatus = :compstatus', { compstatus: GeneralEnum.Activo })
        .orderBy('competidor.delegaid', GeneralEnum.Ascending)
        .addOrderBy('competidor.compnombre', GeneralEnum.Ascending);
    // console.log('queryBuilder', queryBuilder.getQuery());
    return queryBuilder.execute();
}