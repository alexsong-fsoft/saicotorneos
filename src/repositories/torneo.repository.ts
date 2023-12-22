import { AppDataSource } from "../config/database";
import { Torneo } from "../entities/segtorneo.entity";
import { GeneralEnum, TipoFileTorneoEnum } from "../helpers/enums/generalEnum";


const getRepository = () => {
    return AppDataSource.getRepository(Torneo);
}

export const getTorneoByCompania = (
    ciacodigo: string
): Promise<Torneo[] | null>  => {    
    // const repository = AppDataSource.getRepository(Torneo);
    return getRepository().find({
        where: {
            ciacodigo: ciacodigo,
            torneostatus: GeneralEnum.Activo,
        },
    })
}

export const getTorneoAndPortadaByCompania = (
    ciacodigo: string
): Promise<Torneo[] | null>  => {    
    return getRepository().createQueryBuilder('torneo')
        .select('torneo')
        .leftJoinAndSelect('torneo.torneoFiles', 'torneoFile', 'torneoFile.tipo = :tipo', {tipo: TipoFileTorneoEnum.Imagen })
        .where('torneo.ciacodigo = :ciacodigo', { ciacodigo })
        .andWhere('torneo.torneostatus = :torneostatus', { torneostatus: GeneralEnum.Activo })
        // .andWhere('torneoFile.tipo = :tipo', {tipo: TipoFileTorneoEnum.Imagen })
        .getMany();
}

export const getTorneoAndPortadaById = async(
    ciacodigo: string,
    torneoid: number,
): Promise<Torneo | null>  => {    
    return getRepository().createQueryBuilder('torneo')
        .select('torneo')
        .leftJoinAndSelect('torneo.torneoFiles', 'torneoFile', 'torneoFile.tipo = :tipo', {tipo: TipoFileTorneoEnum.Imagen })
        .where('torneo.ciacodigo = :ciacodigo', { ciacodigo })
        .andWhere('torneo.torneoid = :torneoid', { torneoid: Number(torneoid) })
        .andWhere('torneo.torneostatus = :torneostatus', { torneostatus: GeneralEnum.Activo })
        // .andWhere('torneoFile.tipo = :tipo', {tipo: TipoFileTorneoEnum.Imagen })
        .getOne();
}


export const getTorneoCompetidorViewRead = async(
    params: any,
): Promise<any[] | null>  => {    
    return AppDataSource.query(
        `EXECUTE spw_seg_TorneoCompetidorView_read @0, @1, @2, @3, @4, @5, @6, @7, @8, @9, @10, @11, @12, @13, @14, @15, @16`, 
        [
            params.ciacodigo || null,
            params.loccodigo || null,
            params.torneoid || null,
            params.compid || null,
            params.compnombre || null,
            params.compsexo || null,
            params.compmodalidad || null,
            params.compdivision || null,
            params.compnivel || null,
            params.compcategoria || null,
            params.delegaid || null,
            params.torneocompid || null,
            params.torneonombre || null,
            params.torneostatus || null,
            params.tipo || null,
            params.ccruceid || null,
            params.tipoconsulta || null
        ]
    );

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
}
