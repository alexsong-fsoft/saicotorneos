import { NextFunction, Request, Response, Router } from "express";
import ResponseHelper from '../../helpers/ResponseHelper'
import EstadoTransaccionHelper from '../../helpers/EstadoTransaccionHelper'
import { isEmpty } from "lodash";
import { validationResult } from "express-validator";
import { ValidateException } from "../../exceptions/httpExceptions";
import * as delegacionController from '../../controllers/DelegacionController';
import { ImagenDefaultEnum, ImagenTypeEnum } from "../../helpers/enums/generalEnum";

const api = Router();
let respuesta = new ResponseHelper();
let et = new EstadoTransaccionHelper();



api.get('/delegacion/getAll/:ciacodigo', 
    [], 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await delegacionController.getDelegacionAndPortadaByCompania(req.query)
            respuesta.success(et, res, respData, 'OK');
        } catch (error) {
            next(error);
        }
    }    
);


api.get('/delegacion/logo/:id?', 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await delegacionController.getDelegacionLogo(req.params);
            respuesta.sendImage(res, respData, ImagenTypeEnum.asFile, ImagenDefaultEnum.delegacion);
        } catch (error) {
            next(error);
        }
    }
);


api.get('/delegacion/report/:id?', 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isEmpty(validationResult(req)["errors"]))
                throw new ValidateException(validationResult(req)["errors"]);
            let respData = await delegacionController.getDelegacionReport(req.params);

            respuesta.sendReportPdf(res, respData);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = api;