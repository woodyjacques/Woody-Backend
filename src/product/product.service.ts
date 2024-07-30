import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private usersService:UsersService,
    private authService:AuthService
  ) { }

  async findAll() {
    const film = await this.productRepository.find();
    return film;
  }

  async findById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Este producto no existe`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const newFilm = this.productRepository.create(createProductDto);
    const creado = await this.productRepository.save(newFilm);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return { message: "Producto agregado" };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.findById(id);
    const updatedProduct = { ...existingProduct, ...updateProductDto };
    await this.productRepository.save(updatedProduct);

    return { message: "Producto actualizado" };
  }

  async remove(id: number) {
    const existingProduct = await this.findById(id);
    await this.productRepository.remove(existingProduct);
    return existingProduct;
  }

  async enviarCorreos(emailes: string[]) {
    for (const email of emailes) {
      const user = await this.usersService.findOneByEmail(email);
      let correo = "agregado";
      await this.authService.envioEmail(user, user.email, correo);
    }
  }

}
