import { AppDataSource } from "../config/database";
import { TorneoFile } from "../entities";


const getRepository = () => {
    return AppDataSource.getRepository(TorneoFile);
}

export const getTorneoFileById = (
    ID: number
): Promise<any>  => {    
    // return getRepository().findOne({
    //     where: {
    //         ID: ID,
    //     },
    // })
    return getRepository().createQueryBuilder("torneofile")
        .select("torneofile.FileContent", "FileContent")
        .where("torneofile.ID = :ID", { ID })
        .execute();
}