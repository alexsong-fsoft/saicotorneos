import { AutoMap } from "@automapper/classes";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { DelegacionFile } from "./segdelegacionfile.entity";
import { Competidor } from "./segcompetidor.entity";
//import { getDateOnlyDate, getDateOnlyTime } from "../controllers/UtilController";

@Entity({ name: "segdelegacion", schema: "dbo" })
export class Delegacion {

    @PrimaryColumn({ name: "ciacodigo", nullable: false, type: "varchar", length: 2 })
    @AutoMap()
    ciacodigo: string;
    
    @PrimaryColumn({ name: "delegaid", nullable: false, type: "int" })
    @AutoMap()
    delegaid: number;
    
    @Column({ name: "deleganombre", nullable: false, type: "varchar", length: 100 })
    @AutoMap()
    deleganombre: string;
    
    @Column({ name: "delegaprov", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    delegaprov: string;
    
    @Column({ name: "delegaciudad", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    delegaciudad: string;
    
    @Column({ name: "delegadireccion", nullable: true, type: "varchar", length: 100 })
    @AutoMap()
    delegadireccion: string;
    
    @Column({ name: "delegatelefono", nullable: true, type: "varchar", length: 15 })
    @AutoMap()
    delegatelefono: string;
    
    @Column({ name: "delegamail", nullable: true, type: "varchar", length: 50 })
    @AutoMap()
    delegamail: string;
    
    @Column({ name: "delegauser", nullable: false, type: "varchar", length: 10 })
    @AutoMap()
    delegauser: string;
    
    @Column({ name: "delegastatus", nullable: false, type: "varchar", length: 1 })
    @AutoMap()
    delegastatus: string;
    
    @Column({ name: "fecisys", nullable: false, type: "datetime" })
    fecisys: Date;
    
    @Column({ name: "fecmsys", nullable: false, type: "datetime" })
    fecmsys: Date;
    
    @Column({ name: "usuisys", nullable: false, type: "varchar", length: 10 })
    usuisys: string;
    
    @Column({ name: "usumsys", nullable: false, type: "varchar", length: 10 })
    usumsys: string;
    
    @Column({ name: "delegaalias", nullable: true, type: "varchar", length: 15 })
    @AutoMap()
    delegaalias: string;
    
    @Column({ name: "delegaredes", nullable: true, type: "simple-json" })
    delegaredes: any;

    @OneToOne(() => DelegacionFile, (delegacionFile) => delegacionFile.delegacion)
    @AutoMap(() => DelegacionFile)
    delegacionLogo: DelegacionFile;

    @OneToMany(() => Competidor, (competidor) => competidor.delegacion)
    @AutoMap(() => Competidor)
    competidores: Competidor[];

    @AutoMap()
    logo: number;
    
    @AutoMap()
    numDeportistas: number;
}