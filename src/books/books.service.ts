import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookWoody } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookWoody)
    private bookRepository: Repository<BookWoody>,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  async findAll() {
    const books = await this.bookRepository.find();
    return books;
  }

  async findById(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Este libro no existe`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto);
    const creado = await this.bookRepository.save(newBook);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return { message: "libro agregada" };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const existingBook = await this.findById(id);
    const updatedBook = { ...existingBook, ...updateBookDto };
    await this.bookRepository.save(updatedBook);

    return { message: "Libro actualizada" };
  }

  async remove(id: number) {
    const existingBook = await this.findById(id);
    await this.bookRepository.remove(existingBook);
    return existingBook;
  }

  async enviarCorreos(emailes: string[]) {
    for (const email of emailes) {
      const user = await this.usersService.findOneByEmail(email);
      let correo = "agregado";
      await this.authService.envioEmail(user, user.email, correo);
    }
  }
}
