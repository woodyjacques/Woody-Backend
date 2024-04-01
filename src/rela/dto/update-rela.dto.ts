import { ApiProperty } from '@nestjs/swagger';

export class UpdateRelaDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    categories: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    @ApiProperty()
    linkVer: string;
    @ApiProperty()
    linkImagen: string;
}
