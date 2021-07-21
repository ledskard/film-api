import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {AfterLoad, BeforeInsert, BeforeUpdate} from "typeorm/index";
import { hashSync } from "bcrypt";

@Entity("usuarios")
export class User {

    @PrimaryGeneratedColumn({ name: "id" })
    id: string;

    @Column({ name:"nome" })
    name: string;

    @Column({ name:"email", unique: true })
    email: string;

    @Column({ default: true, name:"ativo" })
    active: boolean;

    @Column({ default: false, name:"administrador" })
    isAdmin: boolean;

    @Column({ name: "senha" })
    password: string;

    @AfterLoad()
    loadTempPassword() {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password !== this.tempPassword) this.password = hashSync(this.password, 8);
    }
    public tempPassword?: string;
}
