import _ from "lodash";
import { User } from "../entities";
import * as userRepository from "../repositories/user.repository";
import { mapper } from "../mappings/mapper";
import { UserDto } from "../dtos";
import { ValidateException } from "../exceptions/httpExceptions";
import * as encriptHelper from '../helpers/EncriptHelper';
import { EncriptEnum } from '../helpers/enums/generalEnum';
import { createToken } from "../helpers/JwtHelper";

export const getUserByCompania = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    let users: User[] | null = await userRepository.getUserByCompania(ciacodigo);
    let response: UserDto[] = [];
    if (_.isArray(users) && !_.isEmpty(users)){
        response = mapper.mapArray(users, User, UserDto);
    }
    return response;
}

export const login = async (
    bodyParams: any
) => {
    const params = bodyParams;
    const usercodigoE: string | any = encriptHelper.encrip({sTexto: params.user, sProceso: EncriptEnum.Encriptar}, true);
    const user: User[] | null = await userRepository.getUserByCodigo2(params.ciacodigo, usercodigoE);
    if (!_.isArray(user) || _.isEmpty(user)) {
        throw new ValidateException('userNotExist');
    }
    else {
        const passwordD: string | any = encriptHelper.encrip({sTexto: user[0].userclave, sProceso: EncriptEnum.Desencriptar}, true);
        const passwordValid = _.isEqual(params.password, passwordD); 
        if (!passwordValid) {
            throw new ValidateException("La contraseña es incorrecta, vuelva a intentar por favor.");
        }
        const userDto = mapper.map(user[0], User, UserDto);
        const token = createToken(userDto);
        const response = {
            jwt: token,
            user: userDto
        };
        return response;
    }
}