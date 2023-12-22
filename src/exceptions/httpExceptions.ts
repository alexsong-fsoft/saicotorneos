import _ from "lodash";
// import cMensaje from '../util/CMensaje';


export class ValidateException {
    code: number;
    success: boolean;
    message: string;
    errorData: any;
    constructor(message: any, errorData?: any[]) {
      errorData = errorData ? errorData : [];
      if (_.isArray(message)) {
        const etiquetas = _.uniqBy(message, "param")
          .map((i: any) => i.param)
          .join(", ");
        errorData = message.map((i: any) => i.msg);
        message = !_.isEmpty(errorData) ? errorData.join("\n ") : 'Existen campos obligatorios'; // cMensaje.mensajes.warn?.campoObligatorio(etiquetas);
      }
      this.code = 400;
      this.success = false;
      this.errorData = errorData;
      this.message = message || "";
    }
  }