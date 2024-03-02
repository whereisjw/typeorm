import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { Tagmodel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(Tagmodel)
    private readonly tagRepository: Repository<Tagmodel>
  ) {}

  @Post('users')
  createUser() {
    return this.userRepository.save({});
  }




  @Get('users')
  getUser() {
    return this.userRepository.find({
      relations:{
        profile:true,
        posts:true
      }
    });
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
 
    })
  }



@Post('/user/profile')
async createUserProfile(){
  const user = await this.userRepository.save({
    email:'asdf@naver.com'
  })

  const profile = await this.profileRepository.save({
    profileImg:'asdf.jpg',
    user,
  })

  return user
}


@Post('user/post')
async createUserAndPost(){
  const user = await this.userRepository.save({
    email: 'try@naver.com'
  })
  await this.postRepository.save({
    title:'post 1',
    author:user
  })

  await this.postRepository.save({
    title:'post 2',
    author:user
  })

}


@Post('posts/tags')
  async createPostTags(){
    const post1 = await this.postRepository.save({
      title: 'nestjs '
    })

    const post2 = await this.postRepository.save({
      title: 'nextjs'
    })

    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts:[post1,post2]
    })

    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts:[post1]
    })

    const post3 = await this.postRepository.save({
      title:'nextjs lecture',
      tags:[tag1,tag2]
    })


    return true
  }

@Get('posts')
getPosts(){
  return this.postRepository.find({
    relations:{
      tags:true
    }
  })
}


@Get('tags')
getTags(){
  return this.tagRepository.find({
    relations:{
      posts:true
    }
  })
}

}
