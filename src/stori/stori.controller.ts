import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RelaService } from './stori.service';
import { CreateStoriDto } from './dto/create-stori.dto';
import { UpdateStoriDto } from './dto/update-stori.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Stori')
@Controller('stori')
export class RelaController {
  constructor(private readonly relaService: RelaService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.relaService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.relaService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createStoriDto: CreateStoriDto) {
    return this.relaService.create(createStoriDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateStoriDto: UpdateStoriDto) {
    return this.relaService.update(id, updateStoriDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.relaService.remove(id);
  }
}
