import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name: string;

  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;
}
