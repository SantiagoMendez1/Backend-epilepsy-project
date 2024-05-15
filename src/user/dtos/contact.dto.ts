import { IsOptional, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  name: string;
  @IsString()
  numberPhone: string;
}

export class CreateContactDto extends ContactDto {}

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  numberPhone?: string;
}
