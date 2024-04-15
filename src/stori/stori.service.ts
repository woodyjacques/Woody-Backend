import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoriDto } from './dto/create-stori.dto';
import { UpdateStoriDto } from './dto/update-stori.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoriWoody } from './entities/stori.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RelaService {
  constructor(
    @InjectRepository(StoriWoody)
    private storiRepository: Repository<StoriWoody>,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  async findAll() {
    const stori = await this.storiRepository.find();
    return stori;
  }

  async findById(id: number) {
    const stori = await this.storiRepository.findOne({ where: { id } });

    if (!stori) {
      throw new NotFoundException(`Este relato no existe`);
    }

    return stori;
  }

  async create(createStoriDto: CreateStoriDto) {
    const newStori = this.storiRepository.create(createStoriDto);
    const creado = await this.storiRepository.save(newStori);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return { message: "Relato agregada" };
  }

  async update(id: number, updateStoriDto: UpdateStoriDto) {
    const existingStori = await this.findById(id);
    const updatedStori = { ...existingStori, ...updateStoriDto };
    await this.storiRepository.save(updatedStori);
    return { message: "Relato actualizada" };
  }

  async remove(id: number) {
    const existingStori = await this.findById(id);
    await this.storiRepository.remove(existingStori);
    return existingStori;
  }

  async enviarCorreos(emailes: string[]) {
    for (const email of emailes) {
      const user = await this.usersService.findOneByEmail(email);
      let correo = "agregado";
      await this.authService.envioEmail(user, user.email, correo);
    }
  }
}
