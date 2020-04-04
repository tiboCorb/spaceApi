import { Injectable } from '@nestjs/common';
import { User, Status } from '../graphql.schema';
import * as fs from 'fs';
import {resolve} from "path"


@Injectable()
export class UserService {

    private readonly users: User[] = [{ id: 1, name: 'steve', status: Status.GodLike }];

    create(user: User): User {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        const rawData = fs.readFileSync(resolve('./src/user/user.json'))
        let user = JSON.parse(rawData.toString('utf8'));
        return user;
    }

    findOneById(id: number): User {
        return this.users.find(user => user.id === id);

    }
}
