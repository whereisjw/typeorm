- yarn add typeorm @nestjs/typeorm pg
- docker-compose.yaml

```
services:
  postgres:
    image: postgres:15
    restart: always
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: typeormstudy
```

- postgres-data 폴더생성
- app.module.ts

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [UserModel], // 아래 엔티티에서 만든 테이블 추가
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```


- entity/user.entity.ts 폴더 파일 생성
~~~
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  // 프라이머리 칼람은 primary key이고 primarygeneratedcolumn은 primary key 에서 auto incremnet를 포함
  // 매개변수로 uuid도 받을 수 있음
  id: number;
  @Column()
  title: string;
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
}
~~~



- 프로퍼티
~~~
  @Column({
    type:'varchar',
    name:'title',
    length:300,
    nullable:true, // not null 여부
    update: true,
    select:false,
    default:'default title',
    unique:false //칼럼중 유일무이한 값이 되어야함
  })
~~~

- enum 
~~~
export enum Role{
  USER = 'user',
  ADMIN = 'admin',
}
  @Column({
    type:'enum',
    enum:Role,
    default:Role.USER
  })
  role:Role
~~~


### one to one relationship

### one to many relationship

### many to one relationship

### many to many relationship
- 각각의 프라이머리키만 가르킴
- post_id tag_id
- 중간테이블을 테이블만들때 미리 생각할 필요는 없으나
- 로직은 알고 있어야함


