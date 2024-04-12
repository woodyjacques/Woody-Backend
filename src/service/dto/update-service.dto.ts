import { ApiProperty } from "@nestjs/swagger";

export class UpdateServiceDto{
    @ApiProperty()
    name?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    linkImagen?: string;
}
