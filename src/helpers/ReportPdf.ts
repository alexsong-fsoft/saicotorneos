import _ from "lodash";
import PDFDocument from "pdfkit-table";
import { format } from 'date-fns';
import { PdfTypeEnum } from "../helpers/enums/generalEnum";
import * as utilHelper from "../helpers/UtilHelper";


const headers: any = [
    { label: "Nombre", property: 'name', width: 60, renderer: null },
    { label: "Indetificación", property: 'description', width: 150, renderer: null },
    { label: "Sexo", property: 'price1', width: 100, renderer: null },
    { label: "Fec Nac", property: 'price2', width: 100, renderer: null },
    { label: "Grado", property: 'price3', width: 80, renderer: null },
    {
        label: "Rol", property: 'price4', width: 43,
        renderer: (value, row, indexColumn, indexRow, rectRow, rectCell) => {
            return `U$ ${Number(value).toFixed(2)}`
        }
    },
];

const data: any[] = [
    {
        name: 'Name 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
        price1: '$1',
        price3: '$ 3',
        price2: '$2',
        price4: '4',
    },
    {
        options: { fontSize: 10, separation: true },
        name: 'bold:Name 2',
        description: 'bold:Lorem ipsum dolor.',
        price1: 'bold:$1',
        price3: {
            label: 'PRICE $3', options: { fontSize: 12 }
        },
        price2: '$2',
        price4: '4',
    },
];


interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Header {
    label: string;
    property: string;
    width: number;
    align?: string; //default 'left'
    valign?: string;
    headerColor?: string; //default '#BEBEBE'
    headerOpacity?: number; //default '0.5'
    headerAlign?: string; //default 'left'
    columnColor?: string;
    columnOpacity?: number;
    renderer?: (
        value: any,
        indexColumn?: number,
        indexRow?: number,
        row?: number,
        rectRow?: Rect,
        rectCell?: Rect
    ) => string;
}

export interface ReportPdfParams {
    documentOptions?: {
        size?: string,
        layout?: PdfTypeEnum.layoutPortrait | PdfTypeEnum.layoutLandscape,
        margin?: number,
    }, 
    dataReport: {
        dataHeader: {
            title: string,
            subtitle?: string,
            pathLogo: string,
            reportName: string,
        },
        dataTable: {
            title?: string,
            subtitle?: string,
            headers?: Header[],
            datas?: any[],
            rows?: string[][],
            isGrouped?: boolean,
        }
    }
    // Add more parameters as needed
}

const prepareHeader = (headers: Header[]): Header[] => {
    return headers.map((header: any) => ({
        ...header,
        align: PdfTypeEnum.textAlignmentLeft,
        valign: PdfTypeEnum.textAlignmentLeft,
        padding: 3,
        renderer: header.renderer || null,
        headerColor: header.headerColor || PdfTypeEnum.textColorMain,
        headerOpacity: header.headerOpacity || 1,
        headerAlign: header.headerAlign || PdfTypeEnum.textAlignmentLeft,
        columnColor: header.columnColor || PdfTypeEnum.textColorWhite,
        columnOpacity: header.columnOpacity || 1,
        columnAlign: header.columnAlign || PdfTypeEnum.textAlignmentLeft,
    }
    ));
};


const addBackground = ({ x, y, width, height }, fillColor, fillOpacity, doc, callback?) => {
    fillColor || (fillColor = 'grey');
    fillOpacity || (fillOpacity = 0.1);
    // save current style
    doc.save();
    // draw bg
    doc
        .fill(fillColor) //.stroke(fillColor)
        .fillOpacity(fillOpacity)
        .rect(x, y, width, height)
        .fill(); //.stroke()
    // back to saved style
    doc.restore();
    typeof callback === 'function' && callback(doc);
}


export const fnGroupByAndAddRowHeader = (data, key, keyNameGroup, headersCols?) => {
    const dataGroup = utilHelper.fnGroupDataByKey(data, key);
    const dataGroupArray = Object.entries(dataGroup);
    const dataFinal = [];
    dataGroupArray.map((item) => {
        const headerRow = {
            options: { separation: true },
            ...headersCols
        };
        headerRow[keyNameGroup] = {
            label: item[0], options: { fontSize: 14 }
        };
        const datas: any = item[1];
        dataFinal.push(headerRow, ...datas);
    });
    return dataFinal;
}

export const generateReportPdf = async (
    params: ReportPdfParams
): Promise<Buffer> => {

    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {

        const doc = new PDFDocument(
            {
                size: params.documentOptions?.size || PdfTypeEnum.sizeA4.toString(),
                layout: params.documentOptions?.layout || PdfTypeEnum.layoutPortrait,
                margin: params.documentOptions?.margin || Number(PdfTypeEnum.marginDefault),
                bufferPages: true,
                autoFirstPage: false
            }
        );

        const margin = Number(doc.options.margin);
        const pageWidth = (_.isEqual(doc.options.layout, PdfTypeEnum.layoutPortrait) ? 595 : 842) - margin * 2;
        const pageHeight = (_.isEqual(doc.options.layout, PdfTypeEnum.layoutPortrait) ? 842 : 595) - margin * 2;
        let pageNumber = 0;

        doc.on('pageAdded', () => {
            pageNumber++;
            if (pageNumber == 1) {
                doc.fillColor(PdfTypeEnum.textColorMain).font(PdfTypeEnum.textFont);
                doc.image(params.dataReport.dataHeader.pathLogo, margin, margin, { fit: [75, 75], align: PdfTypeEnum.textAlignmentCenter, valign: PdfTypeEnum.textAlignmentCenter });
                doc.fontSize(PdfTypeEnum.fontSizeSmall).text(format(new Date(), 'yyyy-MM-dd HH:mm'), margin, margin, { width: pageWidth, align: PdfTypeEnum.textAlignmentRight, lineBreak: false });
                doc.moveDown();
                doc.font(PdfTypeEnum.textFontBold, PdfTypeEnum.fontSizeLarge).text(params.dataReport.dataHeader.title, { width: pageWidth, align: PdfTypeEnum.textAlignmentCenter });
                if (params.dataReport.dataHeader.subtitle){
                    doc.moveDown(0);
                    doc.font(PdfTypeEnum.textFont, PdfTypeEnum.fontSizeMedium).text(params.dataReport.dataHeader.subtitle, { width: pageWidth, align: PdfTypeEnum.textAlignmentCenter });
                }
                doc.moveDown(0.5);
                doc.font(PdfTypeEnum.textFontBoldItalic, PdfTypeEnum.fontSizeLarge).text(params.dataReport.dataHeader.reportName, { width: pageWidth, align: PdfTypeEnum.textAlignmentCenter });
                doc.moveTo(margin, 110).lineTo(pageWidth + margin, 110).dash(5, { space: 3 }).stroke(PdfTypeEnum.textColorMain);
            }
            doc.fontSize(PdfTypeEnum.fontSizeSmall).text(`Pág: ${pageNumber}`, margin, pageHeight + (margin / 2), { width: pageWidth, align: PdfTypeEnum.textAlignmentRight, lineBreak: false });
        });

        doc.addPage();
        doc.fillColor(PdfTypeEnum.textColorBlack).font(PdfTypeEnum.textFont, PdfTypeEnum.fontSizeDefault).undash();
        doc.text('', margin, 130);

        const fn_render: any = (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.fillColor(PdfTypeEnum.textColorBlack).font(PdfTypeEnum.textFont, 8).fillOpacity(1);
            if (indexColumn === 0 && row.options?.separation){
                doc.fillColor(PdfTypeEnum.textColorMain).fillOpacity(1);
                addBackground(rectRow, 'grey', 0.1, doc)
            }
        };

        const table = {
            title: params.dataReport.dataTable.title || null,
            subtitle: params.dataReport.dataTable.subtitle || null,
            headers: prepareHeader(params.dataReport.dataTable.headers || headers), // optional
            datas: params.dataReport.dataTable.datas || data, // complex data
            rows: params.dataReport.dataTable.rows || null, // simple data
            // options: {
            //     hideHeader: true,
            //     divider: { 
            //         header: { disabled: false, width: 3, color: PdfTypeEnum.textColorMain, opacity: 0.3 },
            //         horizontal: { disabled: false, width: 1, color: PdfTypeEnum.textColorMain, opacity: 0.3 },
            //      },
            // }
        };
        // the magic
        doc.table(table, {
            prepareHeader: () => doc.fillColor(PdfTypeEnum.textColorWhite).font(PdfTypeEnum.textFontBold).fontSize(PdfTypeEnum.fontSizeDefault).fill(),
            prepareRow: params.dataReport.dataTable.isGrouped ? fn_render : null,
        });

        const buffer: any[] = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
            const data = Buffer.concat(buffer);
            resolve(data);
        });
        doc.end();

    });
    return pdfBuffer;
}
