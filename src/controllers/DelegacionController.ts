import _ from "lodash";
import { Delegacion } from "../entities";
import * as delegacionRepository from "../repositories/delegacion.repository";
import * as delegacionfileRepository from "../repositories/delegacionfile.repository";
import * as congeneralController from '../controllers/ConGeneralController';
import * as competidorController from '../controllers/CompetidorController';
import * as reportPdf from '../helpers/ReportPdf';
import { mapper } from "../mappings/mapper";
import { DelegacionDto } from "../dtos";
import path from "path";


export const getDelegacionAndPortadaByCompania = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    let delegacions: any[] | null = await delegacionRepository.getDelegacionAndLogo(ciacodigo);
    let response: DelegacionDto[] = [];
    if (_.isArray(delegacions) && !_.isEmpty(delegacions)){
        response = mapper.mapArray(delegacions, Delegacion, DelegacionDto);
    }
    return response;
}

export const getDelegacionAndPortadaById = async (
    bodyParams: any
) => {    
    const ciacodigo = bodyParams.ciacodigo;
    const delegaid = bodyParams.delegaid;
    let delegacions: any[] | null = await delegacionRepository.getDelegacionAndLogo(ciacodigo, delegaid);
    let response: DelegacionDto = new DelegacionDto();
    if (_.isArray(delegacions) && !_.isEmpty(delegacions)){
        response = mapper.map(delegacions[0], Delegacion, DelegacionDto);
    }
    return response;
}

export const getDelegacionLogo = async (
    bodyParams: any
) => {
    if(!bodyParams.id){
        return null;
    }
    let file = await delegacionfileRepository.getDelegacionFileById(bodyParams.id);
    if(!_.isNil(file) && file.length > 0){
        return file[0].FileContent;
    }
    return null;
}


export const getDelegacionReport = async (
    bodyParams: any
): Promise<Buffer> => {

    const [compania, alumnosByDelegacion] =
        await Promise.all([
            congeneralController.getCompaniaById({ ciacodigo: process.env.CIA }),
            competidorController.getCompetidorByCia({ ciacodigo: process.env.CIA }),
        ]);
    const pathLogo = path.resolve(__dirname, `../public/Scripts/spat/img/logo/${compania.param1.images.logo1}`);
    // const pathLogo2 = path.join(process.cwd(), `/public/Scripts/spat/img/logo/${compania.param1.images.logo1}`);

    const headersCols = { compidentificacion: '', compsexo: '', compfecnacstr: '', compedad: '', compstatus2: '', };
    const groupByDelegacion = reportPdf.fnGroupByAndAddRowHeader(alumnosByDelegacion, 'deleganombre', 'compnombrecompleto', headersCols)      

    const reportPdfParams: reportPdf.ReportPdfParams = {
        // documentOptions: {
        //     size: PdfTypeEnum.sizeA4.toString(),
        //     layout: PdfTypeEnum.layoutPortrait,
        //     margin: Number(PdfTypeEnum.marginDefault),
        // },
        dataReport: {
            dataHeader: {
                title: compania.ciadescri,
                subtitle: compania.param1.contacs.city,
                pathLogo: pathLogo,
                reportName: 'Reporte de Delegaciones',
            },
            dataTable: {
                // title: 'Listado de Delegaciones',
                // subtitle: format(new Date(), 'dd/MM/yyyy'),
                headers: [
                    { label: "Nombre", property: 'compnombrecompleto', width: 200 },
                    { label: "Iden.", property: 'compidentificacion', width: 80 },
                    { label: "Sexo", property: 'compsexo', width: 80, align: 'center',
                        renderer: (value, row, indexColumn, indexRow, rectRow, rectCell) => {
                            return [{ label: "Masculino", value: 'M' }, { label: "Femenino", value: 'F' }].find((item) => item.value === value)?.label || '';
                        }
                    },
                    { label: "Fec Nac", property: 'compfecnacstr', width: 60 },
                    { label: "Edad", property: 'compedad', width: 60 },
                    { label: "Anualidad", property: 'compstatus2', width: 70,
                        renderer: (value, row, indexColumn, indexRow, rectRow, rectCell) => {
                            // return `U$ ${Number(value).toFixed(2)}`
                            return [{ label: "Habilitado", value: 'A' }, { label: "Inhabilitado", value: 'I' }].find((item) => item.value === value)?.label || '';
                        },
                    },
                ], // widths deben sumar 550 en total para PdfTypeEnum.layoutPortrait y 770 en total para PdfTypeEnum.layoutLandscape
                datas: groupByDelegacion, 
                isGrouped: true,
            }
        },
    };
    
    const pdfBuffer: Buffer = await reportPdf.generateReportPdf(reportPdfParams);
    return pdfBuffer;
}
