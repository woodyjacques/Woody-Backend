import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags("Service")
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.serviceService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.serviceService.remove(id);
  }
}
