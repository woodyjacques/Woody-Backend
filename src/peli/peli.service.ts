import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeliDto } from './dto/create-peli.dto';
import { UpdatePeliDto } from './dto/update-peli.dto';
import { PeliWoody } from './entities/peli.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class PeliService {

  constructor(
    @InjectRepository(PeliWoody)
    private peliRepository: Repository<PeliWoody>,
    private usersService:UsersService,
    private authService:AuthService
  ) { }


  async findAll() {
    const peli = await this.peliRepository.find();
    return peli;
  }

  async findById(id: number) {
    const peli = await this.peliRepository.findOne({ where: { id } });

    if (!peli) {
      throw new NotFoundException(`Esta película no existe`);
    }

    return peli;
  }

  async create(createPeliDto: CreatePeliDto) {
    const newPeli = this.peliRepository.create(createPeliDto);
    const creado = await this.peliRepository.save(newPeli);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return newPeli;
  }

  async update(id: number, updatePeliDto: UpdatePeliDto) {
    const existingPeli = await this.findById(id);
    const updatedPeli = { ...existingPeli, ...updatePeliDto };
    const creado = await this.peliRepository.save(updatedPeli);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return updatedPeli;
  }

  async remove(id: number) {
    const existingPeli = await this.findById(id);
    await this.peliRepository.remove(existingPeli);
    return existingPeli;
  }

  async enviarCorreos(emailes: string[]) {
    for (const email of emailes) {
      const user = await this.usersService.findOneByEmail(email);
      let correo = "agregado";
      await this.authService.envioEmail(user, user.email, correo);
    }
  }
}
