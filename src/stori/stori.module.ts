import { Module } from '@nestjs/common';
import { RelaService } from './stori.service';
import { RelaController } from './stori.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoriWoody } from './entities/stori.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoriWoody]), UsersModule, AuthModule,
  ],
  controllers: [RelaController],
  providers: [RelaService],
  exports: [RelaService]
})
export class StoriModule { }
