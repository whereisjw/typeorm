import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostModel } from "./post.entity";


@Entity()
export class Tagmodel{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToMany(()=>PostModel,(post)=>post.tags)
    @JoinTable()
    posts: PostModel[]





    @Column()
    name:string
}