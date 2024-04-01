import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelaDto } from './dto/create-rela.dto';
import { UpdateRelaDto } from './dto/update-rela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RelatosWoody } from './entities/rela.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RelaService {
  constructor(
    @InjectRepository(RelatosWoody)
    private relaRepository: Repository<RelatosWoody>,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  async findAll() {
    const rela = await this.relaRepository.find();
    return rela;
  }

  async findById(id: number) {
    const rela = await this.relaRepository.findOne({ where: { id } });

    if (!rela) {
      throw new NotFoundException(`Este relato no existe`);
    }

    return rela;
  }

  async create(createRelaDto: CreateRelaDto) {
    const newRela = this.relaRepository.create(createRelaDto);
    const creado = await this.relaRepository.save(newRela);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return newRela;
  }

  async update(id: number, updateBookDto: UpdateRelaDto) {
    const existingRela = await this.findById(id);
    const updatedRela = { ...existingRela, ...updateBookDto };
    const creado = await this.relaRepository.save(updatedRela);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return updatedRela;
  }

  async remove(id: number) {
    const existingRela = await this.findById(id);
    await this.relaRepository.remove(existingRela);
    return existingRela;
  }

  async enviarCorreos(emailes: string[]) {
    for (const email of emailes) {
      const user = await this.usersService.findOneByEmail(email);
      let correo = "agregado";
      await this.authService.envioEmail(user, user.email, correo);
    }
  }
}
