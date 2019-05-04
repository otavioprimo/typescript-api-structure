import { IsString, MinLength, MaxLength, Length, IsEmail } from 'class-validator';

class LoginDto {

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Length(4, 20)
  public password: string;
}

export default LoginDto;