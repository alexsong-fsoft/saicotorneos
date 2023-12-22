import { AppDataSource } from "../config/database";
import { CompetidorFile } from "../entities";


const getRepository = () => {
    return AppDataSource.getRepository(CompetidorFile);
}

export const getCompetidorFileById = (
    ID: number
): Promise<any>  => {
    return getRepository().createQueryBuilder("delegacionfile")
        .select("delegacionfile.FileContent", "FileContent")
        .where("delegacionfile.ID = :ID", { ID })
        .execute();
}