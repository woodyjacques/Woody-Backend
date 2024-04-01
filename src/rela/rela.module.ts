import { Module } from '@nestjs/common';
import { RelaService } from './rela.service';
import { RelaController } from './rela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatosWoody } from './entities/rela.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelatosWoody]), UsersModule, AuthModule,
  ],
  controllers: [RelaController],
  providers: [RelaService],
  exports: [RelaService]
})
export class RelaModule { }
