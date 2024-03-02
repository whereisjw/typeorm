import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Student, Teacher } from './entity/person.entity';
import { AirplaneModel, BookModel, CarModel, ComputerModel, SingleBaseModel } from './entity/inheritance.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { Tagmodel } from './entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel,ProfileModel,PostModel,Tagmodel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [UserModel,Student,Teacher,BookModel,CarModel,ComputerModel,AirplaneModel,SingleBaseModel,ProfileModel,PostModel,Tagmodel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
