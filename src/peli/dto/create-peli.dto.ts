import { ApiProperty } from "@nestjs/swagger";

export class CreatePeliDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    categories: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    linkVer: string;
    @ApiProperty()
    linkTrailer: string;
    @ApiProperty()
    linkImagen: string;
}
