import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Post('users')
  createUser() {
    return this.userRepository.save({});
  }

  @Get('users')
  getUser() {
    return this.userRepository.find();
  }



  @Patch('users/:id')
  async patchUser(@Param('id') id:string){
    const user = await this.userRepository.findOne({
      where:{
        id:+id
      }
    })
    return this.userRepository.save({
      ...user,
      title:user.title+'0'
    })
  }

}
