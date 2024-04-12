import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmWoody } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class PeliService {

  constructor(
    @InjectRepository(FilmWoody)
    private filmRepository: Repository<FilmWoody>,
    private usersService:UsersService,
    private authService:AuthService
  ) { }

  async findAll() {
    const film = await this.filmRepository.find();
    return film;
  }

  async findById(id: number) {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) {
      throw new NotFoundException(`Esta película no existe`);
    }

    return film;
  }

  async create(createFilmDto: CreateFilmDto) {
    const newFilm = this.filmRepository.create(createFilmDto);
    const creado = await this.filmRepository.save(newFilm);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return newFilm;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const existingFilm = await this.findById(id);
    const updatedFilm = { ...existingFilm, ...updateFilmDto };
    const creado = await this.filmRepository.save(updatedFilm);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return updatedFilm;
  }

  async remove(id: number) {
    const existingPeli = await this.findById(id);
    await this.filmRepository.remove(existingPeli);
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
