import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceWoody } from './entities/service.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ServiceService {
  
  constructor(
    @InjectRepository(ServiceWoody)
    private serviceRepository: Repository<ServiceWoody>,
    private usersService:UsersService,
    private authService:AuthService
  ) { }

  async findAll() {
    const service = await this.serviceRepository.find();
    return service;
  }

  async findById(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Este servicio no existe`);
    }

    return service;
  }

  async create(createServiceDto: CreateServiceDto) {
    const newService = this.serviceRepository.create(createServiceDto);
    const creado = await this.serviceRepository.save(newService);
    
    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return newService;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const existingService = await this.findById(id);
    const updatedService = { ...existingService, ...updateServiceDto };
    const creado = await this.serviceRepository.save(updatedService);

    if (creado) {
      const emailes = await this.usersService.findAllEmails();
      await this.enviarCorreos(emailes.emailes);
    }

    return updatedService;
  }

  async remove(id: number) {
    const existingBook = await this.findById(id);
    await this.serviceRepository.remove(existingBook);
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
