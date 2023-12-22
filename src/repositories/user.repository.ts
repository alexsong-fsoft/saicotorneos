import { AppDataSource } from "../config/database";
import { User } from "../entities/spatcuser.entity";
import { GeneralEnum } from "../helpers/enums/generalEnum";


const getRepository = () => {
    return AppDataSource.getRepository(User);
}

export const getUserByCompania = (
    ciacodigo: string
): Promise<User[] | null>  => {    
    return getRepository().find({
        where: {
            ciacodigo: ciacodigo,
            userstatus: "D",
        },
    })
}

export const getUserByCodigo = (
    ciacodigo: string,
    usercodigo: string,
): Promise<User | null>  => {    
    return getRepository().findOne({
        where: {
            ciacodigo: ciacodigo,
            usercodigo: usercodigo,
            userstatus: "D",
        },
    })
}


export const getUserByCodigo2 = (
    ciacodigo: string,
    usercodigo: string,
  ): Promise<User[] | null> => {
    return getRepository().createQueryBuilder("user")
      .select("user.ciacodigo", "ciacodigo")
      .addSelect("user.usercodigo", "usercodigo")
      .addSelect("user.usernombre", "usernombre")
      .addSelect("user.userclave", "userclave")
      .addSelect("user.userstatus", "userstatus")
      .addSelect("user.usercodper", "usercodper")
      .addSelect("user.userflagperfil", "userflagperfil")
      .addSelect("user.useremail", "useremail")
      .where("user.ciacodigo = :ciacodigo", {ciacodigo})
      .andWhere("user.usercodigo = :usercodigo", {usercodigo})
      .andWhere("user.userstatus = 'D'")
      .execute();
  








  }