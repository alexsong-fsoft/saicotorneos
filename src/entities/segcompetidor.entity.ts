import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Delegacion } from "./segdelegacion.entity";
import { CompetidorFile } from "./segcompetidorfile.entity";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";

@Entity({ name: "segcompetidor", schema: "dbo" })
export class Competidor {

    @PrimaryColumn({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    ciacodigo: string;

    @PrimaryColumn({ name: "compid", nullable: false, type: "int" })
    @AutoMap()
    compid: number;

    @Column({ name: "compidentificacion", nullable: false, type: "varchar", length: 13 })
    @AutoMap()
    compidentificacion: string;

    @Column({ name: "compapellido", nullable: false, type: "varchar", length: 100 })
    @AutoMap()
    compapellido: string;

    @Column({ name: "compnombre", nullable: false, type: "varchar", length: 100 })
    @AutoMap()
    compnombre: string;

    @Column({ name: "compfecnac", nullable: false, type: "datetime" })
    @AutoMap()
    compfecnac: Date;

    @Column({ name: "compsexo", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    compsexo: string;

    @Column({ name: "delegaid", nullable: false, type: "int" })
    @AutoMap()
    delegaid: number;

    @Column({ name: "compstatus", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    compstatus: string;

    @Column({ name: "fecisys", nullable: false, type: "datetime" })
    fecisys: Date;

    @Column({ name: "fecmsys", nullable: false, type: "datetime" })
    fecmsys: Date;

    @Column({ name: "usuisys", nullable: false, type: "varchar", length: 10 })
    usuisys: string;

    @Column({ name: "usumsys", nullable: false, type: "varchar", length: 10 })
    usumsys: string;

    @Column({ name: "compprov", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    compprov: string;

    @Column({ name: "compciudad", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    compciudad: string;

    @Column({ name: "compdireccion", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    compdireccion: string;

    @Column({ name: "comptelefono", nullable: true, type: "varchar", length: 15 })
    @AutoMap()
    comptelefono: string;

    @Column({ name: "compmail", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    compmail: string;

    @Column({ name: "compocupacion", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    compocupacion: string;

    @Column({ name: "compinstruccion", nullable: true, type: "varchar", length: 10 })
    @AutoMap()
    compinstruccion: string;

    @Column({ name: "comppeso", nullable: false, type: "decimal", precision: 5, scale: 2 })
    @AutoMap()
    comppeso: number;

    @Column({ name: "compestatura", nullable: false, type: "decimal", precision: 5, scale: 2 })
    @AutoMap()
    compestatura: number;

    @Column({ name: "loccodigo", nullable: true, type: "varchar", length: 2 })
    @AutoMap()
    loccodigo: string;

    @Column({ name: "compstatus2", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    compstatus2: string;

    @Column({ name: "reprenombre", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    reprenombre: string;

    @Column({ name: "repretelefono", nullable: true, type: "varchar", length: 15 })
    @AutoMap()
    repretelefono: string;

    @Column({ name: "repremail", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    repremail: string;

    @OneToOne(type => Delegacion)
    @JoinColumn([
        { name: "ciacodigo", referencedColumnName: "ciacodigo" },
        { name: "delegaid", referencedColumnName: "delegaid" },
    ])
    @AutoMap()
    delegacion: Delegacion;

    @OneToOne(() => CompetidorFile, (competidorFile) => competidorFile.competidor)
    @AutoMap(() => CompetidorFile)
    competidorPerfil: CompetidorFile;

    @AutoMap()
    deleganombre?: string;
}