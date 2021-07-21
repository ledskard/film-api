import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {JoinColumn, ManyToOne } from "typeorm/index";
import {User} from "./User";
import { Movie } from "./Movie";

@Entity("usuarios_filmes")
export class UserMovie {

    @PrimaryGeneratedColumn({ name: "id" })
    id: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "usuario_id" })
    user: User;

    @ManyToOne(() => Movie, (movie) => movie.id)
    @JoinColumn({ name: "filme_id" })
    movie: Movie;

    @Column({ name: "nota" })
    note: number;

}


