import { Module } from '@nestjs/common';
import { PeliService } from './film.service';
import { PeliController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmWoody } from './entities/film.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmWoody]),UsersModule, AuthModule,
  ],
  controllers: [PeliController],
  providers: [PeliService],
  exports: [PeliService]
})
export class FilmModule {}
