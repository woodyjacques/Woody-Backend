import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelaService } from './stori.service';
import { CreateStoriDto } from './dto/create-stori.dto';
import { UpdateStoriDto } from './dto/update-stori.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stori')
@Controller('stori')
export class RelaController {
  constructor(private readonly relaService: RelaService) {}

  @Get()
  findAll() {
    return this.relaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.relaService.findById(id);
  }

  @Post()
  create(@Body() createStoriDto: CreateStoriDto) {
    return this.relaService.create(createStoriDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStoriDto: UpdateStoriDto) {
    return this.relaService.update(id, updateStoriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.relaService.remove(id);
  }
}
