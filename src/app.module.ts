import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { StoriModule } from './stori/stori.module';
import { FilmModule } from './film/film.module';
import { ServiceModule } from './service/service.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      username: process.env.usernameDta,
      password: process.env.password,
      database: process.env.database,
      entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    BooksModule,
    FilmModule,
    StoriModule,
    ServiceModule
  ],
})
export class AppModule {}
