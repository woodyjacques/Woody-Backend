import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelaService } from './rela.service';
import { CreateRelaDto } from './dto/create-rela.dto';
import { UpdateRelaDto } from './dto/update-rela.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rela')
@Controller('rela')
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
  create(@Body() createRelaDto: CreateRelaDto) {
    return this.relaService.create(createRelaDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRelaDto: UpdateRelaDto) {
    return this.relaService.update(id, updateRelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.relaService.remove(id);
  }
}
