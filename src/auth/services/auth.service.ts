import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { UserLog } from 'src/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Register } from '../interfaces/register.inteface';
import { Jwt } from '../interfaces/acces-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserLog> {
    const user: UserLog = await this.userService.findByUserEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: UserLog): Promise<Jwt> {
    const payload = { username: user.name, sub: user._id, roles: user.roles };
    const token = this.jwtService.sign(payload);
    console.log('Token JWT generado:', token);
    return { access_token: token };
  }

  async register(register: Register): Promise<UserLog> {
    const existedUser = await this.userService.findByUserEmail(register.email);
    if (existedUser) {
      throw new BadRequestException('email already exists');
    }
    try {
      const hashedPassword = await bcrypt.hash(register.password, 10);
      const newUser: UserLog = {
        name: register.name.toLowerCase(),
        email: register.email,
        password: hashedPassword,
        roles: 'user',
        contacts: [],
      };
      const createdUser = await this.userService.createUser(newUser);
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
