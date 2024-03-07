import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RequestCreateUser } from '../types/User';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  //todo: tokenを使っていいねの判定を行う
  async findUserbyPublicId(publicId: string) {
    const user = await this.userRepository.findProfilebyPublicId(publicId);
    return user;
  }

  async findUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async findIsUser(id: string) {
    const isUser = await this.userRepository.findIsUserById(id);
    return isUser;
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }

  async updateUser(user: CreateUserDto) {
    const updatedUser = await this.userRepository.updateUser(user);
    return updatedUser;
  }
}
