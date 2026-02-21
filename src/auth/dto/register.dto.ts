import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum RoleDto {
  ETUDIANT = 'ETUDIANT',
  LYCEEN = 'LYCEEN',
  INSTITUTION = 'INSTITUTION',
  RECRUTEUR = 'RECRUTEUR',
  TUTEUR = 'TUTEUR',
  MENTOR = 'MENTOR',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(RoleDto)
  role!: RoleDto;
}
