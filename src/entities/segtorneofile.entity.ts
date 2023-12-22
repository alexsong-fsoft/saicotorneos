
import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";
import { Torneo } from './segtorneo.entity';

@Entity({ name: "segtorneofile", schema: "dbo" })
export class TorneoFile {

    @PrimaryColumn({ name: "ID", nullable: false, type: "int" })
    @AutoMap()
    ID: number;
    
    @Column({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    ciacodigo: string;
    
    @Column({ name: "loccodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    loccodigo: string;
    
    @Column({ name: "torneoid", nullable: false, type: "int" })
    @AutoMap()
    torneoid: number;
    
    @Column({ name: "FileContent", nullable: false, select: false })
    FileContent: Buffer;
    
    @Column({ name: "MimeType", nullable: false, type: "varchar", length: 50 })
    @AutoMap()
    MimeType: string;
    
    @Column({ name: "FileName", nullable: false, type: "varchar", length: 100 })
    @AutoMap()
    FileName: string;
    
    @Column({ name: "tipo", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    tipo: string;
    
    // @ManyToOne((type) => Torneo)
    // @JoinColumn({ name: "torneoid" })
    // torneo: Torneo;

    @ManyToOne(type => Torneo)
    @JoinColumn([
        { name: "ciacodigo", referencedColumnName: "ciacodigo" },
        { name: "loccodigo", referencedColumnName: "loccodigo" },
        { name: "torneoid", referencedColumnName: "torneoid" },
    ])
    torneo: Torneo;
}
