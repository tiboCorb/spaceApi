import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    UserModule,
    MovieModule,
  ],
 
})
export class AppModule {}
