import { NextFunction, Request, Response, Router } from "express";
import ResponseHelper from '../../helpers/ResponseHelper'
import EstadoTransaccionHelper from '../../helpers/EstadoTransaccionHelper'
import { isEmpty } from "lodash";
import { check, validationResult } from "express-validator";
import { ValidateException } from "../../exceptions/httpExceptions";
import * as userController from '../../controllers/UserController';

const api = Router();
let respuesta = new ResponseHelper();
let et = new EstadoTransaccionHelper();

api.get('/user/getAll/:ciacodigo', 
    [], 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await userController.getUserByCompania(req.params)
            respuesta.success(et, res, respData, 'OK');
        } catch (error) {
            next(error);
        }
    }    
);

api.post('/login',
    [
        // check('user', 'El email no es valido').notEmpty(),
        // check('password', 'Ingrese la contraseña por favor, es requerido').notEmpty(),
    ], 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await userController.login(req.body)
            respuesta.success(et, res, respData, 'OK');
                // res.render('home/desktop');

        } catch (error) {
            console.log('err', error);
            next(error);
        }
    }
);


module.exports = api;