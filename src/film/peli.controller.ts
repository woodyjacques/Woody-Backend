import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeliService } from './peli.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
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
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.peliService.create(createFilmDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.peliService.update(id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.peliService.remove(id);
  }
}
