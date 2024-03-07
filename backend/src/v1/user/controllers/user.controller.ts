import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Request,
  Body,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/publicId/:publicId')
  async getProfileByPublicId(@Param('publicId') publicId: string) {
    const profile = this.userService.findUserbyPublicId(publicId);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUser(@Request() req) {
    const user = await this.userService.findUser(req.user.userId);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/id/only')
  async getIsUser(@Request() req) {
    const isUser = await this.userService.findIsUser(req.user.userId);
    return isUser;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() Body: CreateUserDto, @Request() req) {
    const user = this.userService.createUser({
      ...Body,
      id: req.user.userId,
    });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() Body: CreateUserDto, @Request() req) {
    const user = this.userService.updateUser({
      ...Body,
      id: req.user.userId,
    });
    return user;
  }
}
