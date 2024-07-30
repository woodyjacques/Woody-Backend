import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

}
