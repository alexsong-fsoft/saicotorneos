import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Competidor } from "./segcompetidor.entity";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";

@Entity({ name: "segcompetidorfile", schema: "dbo" })
export class CompetidorFile {

    @PrimaryColumn({ name: "ID", nullable: false, type: "int" })  
    @AutoMap()
    ID: number; 

    @Column({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })  
    @AutoMap()
    ciacodigo: string; 

    @Column({ name: "compid", nullable: false, type: "int" })  
    @AutoMap()
    compid: number; 

    @Column({ name: "FileContent", nullable: false  })  
    @AutoMap()
    FileContent: Buffer;

    @Column({ name: "MimeType", nullable: false, type: "varchar", length: 50 })  
    @AutoMap()
    MimeType: string; 

    @Column({ name: "FileName", nullable: false, type: "varchar", length: 100 })  
    @AutoMap()
    FileName: string; 

    @OneToOne(type => Competidor)
    @JoinColumn([
        { name: "ciacodigo", referencedColumnName: "ciacodigo" },
        { name: "compid", referencedColumnName: "compid" },
    ])
    competidor: Competidor;

}