import { AppDataSource } from "../config/database";
import { Delegacion } from "../entities/segdelegacion.entity";
import { GeneralEnum } from "../helpers/enums/generalEnum";


const getRepository = () => {
    return AppDataSource.getRepository(Delegacion);
}

export const getDelegacionByCompania = (
    ciacodigo: string
): Promise<Delegacion[] | null>  => {    
    return getRepository().find({
        where: {
            ciacodigo: ciacodigo,
            delegastatus: GeneralEnum.Activo,
        },
    })
}

export const getDelegacionAndLogo = (
    ciacodigo: string,
    delegaid?: number,
): Promise<any[] | null>  => {    
    let queryBuilder = getRepository().createQueryBuilder('delegacion')
        .select('delegacion.ciacodigo', 'ciacodigo')
        .addSelect('delegacion.delegaid', 'delegaid')
        .addSelect('delegacion.deleganombre', 'deleganombre')
        .addSelect('delegacion.delegaprov', 'delegaprov')
        .addSelect('delegacion.delegaciudad', 'delegaciudad')
        .addSelect('delegacion.delegadireccion', 'delegadireccion')
        .addSelect('delegacion.delegatelefono', 'delegatelefono')
        .addSelect('delegacion.delegamail', 'delegamail')
        .addSelect('delegacion.delegauser', 'delegauser')
        .addSelect('delegacion.delegastatus', 'delegastatus')
        .addSelect('delegacion.delegaalias', 'delegaalias')
        .addSelect('delegacion.delegaredes', 'delegaredes')
        .addSelect('COALESCE(delegacionFile.ID, 0)', 'logo')
        .addSelect('COUNT(competidores.compid)', 'numDeportistas')
        .leftJoin('delegacion.delegacionLogo', 'delegacionFile')
        .leftJoin('delegacion.competidores', 'competidores')
        // .loadRelationCountAndMap('delegacion.competidores', 'delegacion.competidores')
        .where('delegacion.ciacodigo = :ciacodigo', { ciacodigo })
        .andWhere('delegacion.delegastatus = :delegastatus', { delegastatus: GeneralEnum.Activo });
        // .andWhere('delegacionFile.ID IS NOT NULL')
    if(delegaid){
        queryBuilder.andWhere('delegacion.delegaid = :delegaid', { delegaid })
    }
    queryBuilder.groupBy('delegacion.ciacodigo')
        .addGroupBy('delegacion.delegaid')
        .addGroupBy('delegacionFile.ID')
        .addGroupBy('delegacion.deleganombre')
        .addGroupBy('delegacion.delegaprov')
        .addGroupBy('delegacion.delegaciudad')
        .addGroupBy('delegacion.delegadireccion')
        .addGroupBy('delegacion.delegatelefono')
        .addGroupBy('delegacion.delegamail')
        .addGroupBy('delegacion.delegauser')
        .addGroupBy('delegacion.delegastatus')
        .addGroupBy('delegacion.delegaalias')
        .addGroupBy('delegacion.delegaredes');
    return queryBuilder.execute();
}


