import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto  {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    element?: string;
    @ApiProperty()
    description?: string;
}
