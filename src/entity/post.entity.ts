import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";
import { Tagmodel } from "./tag.entity";

@Entity()
export class PostModel{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>UserModel,(user)=>user.posts)
    author:UserModel;

    @ManyToMany(()=>Tagmodel,(tag)=>tag.posts)
    tags:Tagmodel[]


  

    @Column()
    title:string
}