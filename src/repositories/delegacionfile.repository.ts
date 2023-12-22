import { AppDataSource } from "../config/database";
import { DelegacionFile } from "../entities";


const getRepository = () => {
    return AppDataSource.getRepository(DelegacionFile);
}

export const getDelegacionFileById = (
    ID: number
): Promise<any>  => {
    return getRepository().createQueryBuilder("delegacionfile")
        .select("delegacionfile.FileContent", "FileContent")
        .where("delegacionfile.ID = :ID", { ID })
        .execute();
}