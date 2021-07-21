import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("filmes")
export class Movie {

    @PrimaryGeneratedColumn({name: "id"})
    id: string;

    @Column({name:"nome"})
    name: string;

    @Column({name:"diretor"})
    director: string;

    @Column({name:"genero"})
    genre: string;

    @Column({default: true, name:"ativo"})
    active: boolean;

}
