import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
  @IsString()
  paper: string;
  @IsBoolean()
  isVerified: boolean;
}

