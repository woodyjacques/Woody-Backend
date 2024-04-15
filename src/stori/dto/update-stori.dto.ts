import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoriDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    categories: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    linkVer: string;
    @ApiProperty()
    linkImagen: string;
}
