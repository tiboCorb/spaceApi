import { Min } from 'class-validator';
import { CreateUserInput } from '../../graphql.schema';

export class CreateUserDto extends CreateUserInput {
 
  name: string;
}