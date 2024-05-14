import { IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  name: string;
  @IsString()
  numberPhone: string;
}

export class CreateContactDto extends ContactDto {}
