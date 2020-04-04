import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema';

@Injectable()
export class UserService {

    private readonly users: User[] = [{ id: 1, name: 'Cat', status: "godlike" }];

    create(user: User): User {
      user.id = this.users.length + 1;
      this.users.push(user);
      return user;
    }
  
    findAll(): User[] {
      return this.users;
    }
  
    findOneById(id: number): User {
      return this.users.find(user => user.id === id);
    }
}
