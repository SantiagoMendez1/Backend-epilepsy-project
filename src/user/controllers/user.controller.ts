import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    return this.userService.findUserContacts(req.user.userId);
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
    @Param('idContact') idContact: string,
  ) {
    return this.userService.deleteContactUser(req.user.userId, idContact);
  }
}
