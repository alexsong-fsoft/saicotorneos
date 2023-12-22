import { Compania } from "../entities/spatccompania.entity";
import { AppDataSource } from "../config/database";

export const getCompaniaById = (
    ciacodigo: string
): Promise<Compania | null>  => {    
    const repository = AppDataSource.getRepository(Compania);
    return repository.findOne({
        where: {
            ciacodigo: ciacodigo,
        },
    })
}
