import EstadoTransaccionHelper from "./EstadoTransaccionHelper";
import { Response } from "express";
// import cMensaje from "../util/CMensaje";
import _ from "lodash";
import path from 'path';
import { ImagenDefaultEnum, ImagenTypeEnum, PdfTypeEnum } from "./enums/generalEnum";

let estadoResponse = new EstadoTransaccionHelper();

export default class ResponseTransaccion {
  
  success(et: EstadoTransaccionHelper, resp: Response, data: any, msg: string) {
    et.code = 200;
    et.success = true;
    et.message = msg;
    et.data = typeof(data) === 'undefined' ? [] : data;
    return resp.status(et.code).send({
      ...et,
    });
  }


  send(resp: Response, data: any, msg?: string) {
    estadoResponse.code = 200;
    estadoResponse.success = true;
    estadoResponse.message = msg || 'OK'; // cMensaje.mensajes.sucess.ok;
    estadoResponse.data = data || [];
    return resp.status(estadoResponse.code).send(estadoResponse);
  }


  sendImage(resp: Response, imagen: Buffer | null, tipo: ImagenTypeEnum, imagedefault: ImagenDefaultEnum) {
    if(_.isNil(imagen)){
      let path_img = `./public/Scripts/spat/img/images/${imagedefault}`;
      return resp.status(200).sendFile(path.resolve(path_img));
    }
    if(_.isEqual(tipo, ImagenTypeEnum.base64)){
      const base64Flag = "data:" + ImagenTypeEnum.contentType + ";" + ImagenTypeEnum.base64 +",";
      const b64Image = Buffer.from(imagen).toString("base64");
      return resp.status(200).send(base64Flag + b64Image);
    }
    else {
      return resp.writeHead(200, {
        'Content-Type': ImagenTypeEnum.contentType,
        'Content-Length': imagen.length
      }).end(imagen);
    }
  }

  sendReportPdf(resp: Response, pdfBuffer: Buffer | null) {
    if(_.isNil(pdfBuffer)){
      throw new Error('No se pudo generar el reporte');
    }
    else {
      return resp.writeHead(200, {
        'Content-Type': PdfTypeEnum.contentType,
        'Content-Disposition': 'attachment; filename=report.pdf',
        'Content-Length': pdfBuffer.length
      }).end(pdfBuffer);
    }
  }
  

}
