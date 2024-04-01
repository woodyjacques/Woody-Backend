import { Module } from '@nestjs/common';
import { PeliService } from './peli.service';
import { PeliController } from './peli.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliWoody } from './entities/peli.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PeliWoody]),UsersModule, AuthModule,
  ],
  controllers: [PeliController],
  providers: [PeliService],
  exports: [PeliService]
})
export class PeliModule {}
