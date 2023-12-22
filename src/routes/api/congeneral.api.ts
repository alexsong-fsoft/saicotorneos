import { NextFunction, Request, Response, Router } from "express";
import ResponseHelper from '../../helpers/ResponseHelper'
import EstadoTransaccionHelper from '../../helpers/EstadoTransaccionHelper'
import { isEmpty } from "lodash";
import { validationResult } from "express-validator";
import { ValidateException } from "../../exceptions/httpExceptions";
import * as congeneralController from '../../controllers/ConGeneralController';

const api = Router();
let respuesta = new ResponseHelper();
let et = new EstadoTransaccionHelper();



api.get('/congeneral/obtener/:ciacodigo', 
    [], 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await congeneralController.getCompaniaById(req.params)
            respuesta.success(et, res, respData, 'OK');
        } catch (error) {
            next(error);
        }
    }    
);



module.exports = api;