import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Get('contacts')
  async getUserContacts(@Request() req): Promise<ContactDto[]> {
    return this.userService.getUserContacts(req.user.userId);
  }

  @Post('contacts')
  async addUserContacts(
    @Body() createContactDto: CreateContactDto,
    @Request() req,
  ): Promise<ContactDto[]> {
    return this.userService.addUserContacts(req.user.userId, createContactDto);
  }

  @Delete('contacts/:idContact')
  async deleteContactUser(
    @Request() req,
    @Param('idContact') contactId: string,
  ) {
    return this.userService.deleteUserContact(req.user.userId, contactId);
  }

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
