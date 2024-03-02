import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';



export enum Role{
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  // 프라이머리 칼람은 primary key이고 primarygeneratedcolumn은 primary key 에서 auto incremnet를 포함
  // 매개변수로 uuid도 받을 수 있음
  id: number;

  email:string
  /* @Column({
    type:'varchar',
    name:'title',
    length:300,
    nullable:true, // not null 여부
    update: true,
    select:false,
    default:'default title',
    unique:false //칼럼중 유일무이한 값이 되어야함
  })
  title: string; */

  @Column({
    type:'enum',
    enum:Role,
    default:Role.USER
  })
  role:Role


  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  // 데이터가 업데이트 될때마다 1씩 올라간다
  // 처음 생성되면 값은 1이다
  // save() 함수가 몇번 불렀는지 기억한다
  @VersionColumn()
  version: number;

  @Column()
  @Generated('increment') //uuid도 넣을 수 있음 
  additinalId: number;


  @OneToOne(()=>ProfileModel,(profile)=>profile.user)
  profile:ProfileModel

  @OneToMany(()=>PostModel,(post)=>post.author)
  posts:PostModel[];

}
