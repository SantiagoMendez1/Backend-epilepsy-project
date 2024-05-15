import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateContactDto, ContactDto } from '../dtos/create-contact.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('contacts')
  async getUserContacts(@Request() req): Promise<ContactDto[]> {
    return this.userService.getUserContacts(req.user.userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('contacts')
  async addUserContacts(
    @Body() createContactDto: CreateContactDto,
    @Request() req,
  ): Promise<ContactDto[]> {
    return this.userService.addUserContacts(req.user.userId, createContactDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('contacts/:idContact')
  async deleteContactUser(
    @Request() req,
    @Param('idContact') contactId: string,
  ) {
    return this.userService.deleteUserContact(req.user.userId, contactId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('contacts/:idContact')
  async updateContactUser(
    @Request() req,
    @Param('idContact') contactId: string,
    @Body() updateContact: object,
  ) {
    console.log(req.user.userId, contactId, updateContact);

    return this.userService.updateUserContact(
      req.user.userId,
      contactId,
      updateContact,
    );
  }
}
