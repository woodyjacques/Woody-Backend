import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeliService } from './peli.service';
import { CreatePeliDto } from './dto/create-peli.dto';
import { UpdatePeliDto } from './dto/update-peli.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Peli')
@Controller('peli')
export class PeliController {
  constructor(private readonly peliService: PeliService) {}

  @Get()
  findAll() {
    return this.peliService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.peliService.findById(id);
  }

  @Post()
  create(@Body() createPeliDto: CreatePeliDto) {
    return this.peliService.create(createPeliDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePeliDto: UpdatePeliDto) {
    return this.peliService.update(id, updatePeliDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.peliService.remove(id);
  }
}
