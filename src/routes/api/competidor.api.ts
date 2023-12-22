import { NextFunction, Request, Response, Router } from "express";
import ResponseHelper from '../../helpers/ResponseHelper'
import EstadoTransaccionHelper from '../../helpers/EstadoTransaccionHelper'
import { isEmpty } from "lodash";
import { validationResult } from "express-validator";
import { ValidateException } from "../../exceptions/httpExceptions";
import * as competidorController from '../../controllers/CompetidorController';
import { ImagenDefaultEnum, ImagenTypeEnum } from "../../helpers/enums/generalEnum";

const api = Router();
let respuesta = new ResponseHelper();
let et = new EstadoTransaccionHelper();



api.get('/competidor/getByDelegacion/:ciacodigo/:delegaid', 
    [], 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await competidorController.getCompetidorByDelegacion(req.params)
            respuesta.success(et, res, respData, 'OK');
        } catch (error) {
            next(error);
        }
    }    
);


api.get('/competidor/perfil/:id?', 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await competidorController.getCompetidorPerfil(req.params);
            respuesta.sendImage(res, respData, ImagenTypeEnum.asFile, ImagenDefaultEnum.competidor);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = api;