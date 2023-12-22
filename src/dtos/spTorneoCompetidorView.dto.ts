export class TorneoCompetidorViewByDelegacionDto {
    ciacodigo: string;
    loccodigo: string;
    torneoid: number;
    torneonombre: string;
    torneostatus: string;
    delegaid: number;
    delegaalias: string;
    deleganombre: string;
    FileName: string;
    registrados: number;

}

export class TorneoCompetidorViewByModalidadDto {
    ciacodigo: string;
    loccodigo: string;
    torneoid: number;
    torneonombre: string;
    torneostatus: string;
    compmodalidad: string;
    compsexo: string;
    compnivel: string;
    compcategoria: string;
    compdivision: string;
    modalidaddescri: string;
    niveldescri: string;
    categoriadescri: string;
    divisiondescri: string;
    registrados: number;
    estado: string;
    ccruceid: string;

}

export class TorneoCompetidorViewByPosicionesDto {
    ciacodigo: string;
    loccodigo: string;
    torneoid: number;
    torneonombre: string;
    delegaid: number;
    deleganombre: string;
    oro: number;
    plata: number;
    bronce: number;
    cuarto: number;
    puntos: number;
    lugar: number;
    hasLogo: number;
    fileLogo: string;

}