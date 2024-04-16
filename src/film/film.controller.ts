import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PeliService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Film')
@Controller('film')
export class PeliController {
  constructor(private readonly peliService: PeliService) {}

  @Get()
  findAll() {
    return this.peliService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.peliService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.peliService.create(createFilmDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.peliService.update(id, updateFilmDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.peliService.remove(id);
  }
}
