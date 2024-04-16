import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    element: string;
    @ApiProperty()
    description: string;
}
