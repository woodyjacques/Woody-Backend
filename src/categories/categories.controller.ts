import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto'; 
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.categoriesService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
