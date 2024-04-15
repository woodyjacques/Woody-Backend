import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    categories: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    linkLeer?: string;
    @ApiProperty()
    linkImagen: string;
}

