import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string


  @IsNotEmpty()
  @IsString()
  username: string


  @IsNotEmpty()
  @IsString()
  email: string


  @IsNotEmpty()
  @IsStrongPassword()
  password: string


  @IsNotEmpty()
  @IsString()
  location: string


}