import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TorneoFile } from "./segtorneofile.entity";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";

@Entity({ name: "segtorneo", schema: "dbo" })
export class Torneo {

    @PrimaryColumn({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    ciacodigo: string;

    @PrimaryColumn({ name: "loccodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    loccodigo: string;

    @PrimaryColumn({ name: "torneoid", nullable: false, type: "int" })
    @AutoMap()
    torneoid: number;

    @Column({ name: "torneonombre", nullable: false, type: "varchar", length: 100 })
    @AutoMap()
    torneonombre: string;

    @Column({ name: "torneodescri", nullable: true, type: "varchar", length: 1000 })
    @AutoMap()
    torneodescri: string;

    @Column({ name: "torneofecinicio", nullable: false, type: "datetime" })
    @AutoMap()
    torneofecinicio: Date;

    @Column({ name: "torneofecfin", nullable: false, type: "datetime" })
    @AutoMap()
    torneofecfin: Date;

    @Column({ name: "torneofecmaxins", nullable: true, type: "datetime" })
    @AutoMap()
    torneofecmaxins: Date;

    @Column({ name: "torneoprov", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    torneoprov: string;

    @Column({ name: "torneociudad", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    torneociudad: string;

    @Column({ name: "torneodireccion", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    torneodireccion: string;

    @Column({ name: "torneotipo", nullable: true, type: "varchar", length: 1000 })
    @AutoMap()
    torneotipo: string;

    @Column({ name: "torneostatus", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    torneostatus: string;

    @Column({ name: "fecisys", nullable: false, type: "datetime" })
    fecisys: Date;

    @Column({ name: "fecmsys", nullable: false, type: "datetime" })
    fecmsys: Date;

    @Column({ name: "usuisys", nullable: false, type: "varchar", length: 10 })
    usuisys: string;

    @Column({ name: "usumsys", nullable: false, type: "varchar", length: 10 })
    usumsys: string;

    @Column({ name: "torneoorganiza", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    torneoorganiza: string;

    @OneToMany(() => TorneoFile, (torneoFile) => torneoFile.torneo)
    @AutoMap(() => TorneoFile)
    torneoFiles: TorneoFile[];
}