import { NextFunction, Request, Response, Router } from "express";
import ResponseHelper from '../../helpers/ResponseHelper'
import EstadoTransaccionHelper from '../../helpers/EstadoTransaccionHelper'
import { isEmpty } from "lodash";
import { validationResult } from "express-validator";
import { ValidateException } from "../../exceptions/httpExceptions";
import * as torneoController from '../../controllers/TorneoController';
import { ImagenDefaultEnum, ImagenTypeEnum } from "../../helpers/enums/generalEnum";
import { getTorneoFileById } from '../../repositories/torneofile.repository';

const api = Router();
let respuesta = new ResponseHelper();
let et = new EstadoTransaccionHelper();



api.get('/torneo/getAll/:ciacodigo', 
    [], 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await torneoController.getTorneoAndPortadaByCompania(req.params)
            respuesta.success(et, res, respData, 'OK');
        } catch (error) {
            next(error);
        }
    }    
);


api.get('/torneo/portada/:id?', 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await torneoController.getTorneoFile(req.params);
            respuesta.sendImage(res, respData, ImagenTypeEnum.asFile, ImagenDefaultEnum.torneo);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = api;