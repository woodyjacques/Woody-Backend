import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryWoody } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryWoody)
    private categoryRepository: Repository<CategoryWoody>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Categoría no existe`);
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const existingCategory = await this.categoryRepository.findOne({ where: { name } });
  
    if (existingCategory) {
      throw new NotFoundException(`La categoría "${name}" ya existe`);
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);
  
    return { message: "Categoría agregada" };
  }
   

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.findById(id);
    const updatedCategory = { ...existingCategory, ...updateCategoryDto };
    await this.categoryRepository.save(updatedCategory);
    return { message: "Categoría actualizada" };
  }

  async remove(id: number) {
    const existingCategory = await this.findById(id);
    await this.categoryRepository.remove(existingCategory);
    return existingCategory;
  }
}
