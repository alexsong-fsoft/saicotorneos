import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";

@Entity({ name: "spatccompania", schema: "dbo" })
export class Compania {

    @PrimaryColumn({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    ciacodigo: string;

    @Column({ name: "ciadescri", nullable: false, type: "varchar", length: 300 })
    @AutoMap()
    ciadescri: string;

    @Column({ name: "ciaalias", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    ciaalias: string;

    @Column({ name: "param1", nullable: true, type: "simple-json" })
    // @AutoMap()
    param1: any;

    @Column({ name: "param2", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    param2: string;

    @Column({ name: "ciastatus", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    ciastatus: string;

    @Column({ name: "fecisys", nullable: false, type: "datetime" })
    fecisys: Date;

    @Column({ name: "fecmsys", nullable: false, type: "datetime" })
    fecmsys: Date;

    @Column({ name: "usuisys", nullable: false, type: "varchar", length: 10 })
    usuisys: string;

    @Column({ name: "usumsys", nullable: false, type: "varchar", length: 10 })
    usumsys: string;

}


