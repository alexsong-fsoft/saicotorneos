import jwt from 'jsonwebtoken';
import { ValidateException } from '../exceptions/httpExceptions';
import { UserDto } from '../dtos';

export const createToken = (user: UserDto) => {
    const payload = {
        sub: user.usercodigo,
        first_name: user.usernombre,
        //last_name: user.useremail,
        email: user.useremail,
        //perfil: user.imagen,
        //telefono: user.telefono,
    }
    try {
        const secretOrPrivateKey = `${process.env.SECRET_JWT}`;
        let token = jwt.sign(payload, secretOrPrivateKey, {
            expiresIn: "1 days"
        });
        return token;
    } catch (error) {
        console.log(error);
        throw new ValidateException("No se pudo generar el token.");
    }
}