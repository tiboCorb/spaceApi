import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { UseGuards, ParseIntPipe } from '@nestjs/common';
import { User } from '../graphql.schema';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { CreateUserDto } from './dto/creat-user.dto'
import { PubSub } from 'graphql-subscriptions';


const pubSub = new PubSub();

@Resolver('User')
export class UserResolver {

    constructor(private readonly userService: UserService) {}

  @Query()
  @UseGuards(UserGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Mutation('createUser')
  async create(@Args('createCatInput') args: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  catCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
