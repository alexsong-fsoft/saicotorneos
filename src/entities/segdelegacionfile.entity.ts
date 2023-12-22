
import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";
import { Delegacion } from './segdelegacion.entity';

@Entity({ name: "segdelegacionfile", schema: "dbo" })
export class DelegacionFile {
    
    @PrimaryColumn({ name: "ID", nullable: false, type: "int" })  
    @AutoMap() 
    ID: number; 
    
    @Column({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })  
    @AutoMap() 
    ciacodigo: string; 
    
    @Column({ name: "delegaid", nullable: false, type: "int" })  
    @AutoMap() 
    delegaid: number; 
    
    @Column({ name: "FileContent", nullable: false  })  
    FileContent: Buffer;
    
    @Column({ name: "MimeType", nullable: false, type: "varchar", length: 50 })  
    @AutoMap() 
    MimeType: string; 
    
    @Column({ name: "FileName", nullable: false, type: "varchar", length: 100 })  
    @AutoMap() 
    FileName: string; 
    
    @OneToOne(type => Delegacion)
    @JoinColumn([
        { name: "ciacodigo", referencedColumnName: "ciacodigo" },
        { name: "delegaid", referencedColumnName: "delegaid" },
    ])
    delegacion: Delegacion;
}
