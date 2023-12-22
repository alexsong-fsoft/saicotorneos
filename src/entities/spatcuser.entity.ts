import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";

@Entity({ name: "spatcuser", schema: "dbo" })
export class User {

    @PrimaryColumn({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })  
    @AutoMap()
    ciacodigo: string; 
    
    @PrimaryColumn({ name: "usercodigo", nullable: false, type: "varchar", length: 10 })  
    @AutoMap()
    usercodigo: string; 
    
    @Column({ name: "usernombre", nullable: false, type: "varchar", length: 100 })  
    @AutoMap()
    usernombre: string; 
    
    @Column({ name: "userclave", nullable: false, type: "varchar", length: 10, select: false })  
    userclave: string; 
    
    @Column({ name: "userstatus", nullable: false, type: "varchar", length: 1 })  
    @AutoMap()
    userstatus: string; 
    
    @Column({ name: "usercodper", nullable: true, type: "varchar", length: 10 })  
    @AutoMap()
    usercodper: string; 
    
    @Column({ name: "userflagperfil", nullable: false, type: "int" })  
    @AutoMap()
    userflagperfil: number; 
    
    @Column({ name: "useremail", nullable: true, type: "varchar", length: 60 })  
    @AutoMap()
    useremail: string; 
    
    @Column({ name: "fecisys", nullable: false, type: "datetime" })  
    fecisys: Date; 
    
    @Column({ name: "fecmsys", nullable: false, type: "datetime" })  
    fecmsys: Date; 
    
    @Column({ name: "usuisys", nullable: false, type: "varchar", length: 10 })  
    usuisys: string; 
    
    @Column({ name: "usumsys", nullable: false, type: "varchar", length: 10 })  
    usumsys: string; 
}
