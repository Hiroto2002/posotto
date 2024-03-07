import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  RequestCreateUser,
  ResponseCreateUser,
  ResponseProfileUser,
} from 'src/v1/user/types/User';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  //  いらないカラムがあるかも
  async findProfilebyPublicId(publicId: string): Promise<ResponseProfileUser> {
    const profile = this.prisma.user.findUnique({
      select: {
        id: true,
        publicId: true,
        nickname: true,
        img_url: true,
        isPublic: true,
        link: true,
        birthday: true,
        comment: true,
        posts: {
          select: {
            id: true,
            content: true,
            created_at: true,
            _count: {
              select: { favorites: true },
            },
          },
        },
        _count: {
          select: {
            follower: true,
            followed: true,
          },
        },
      },
      where: { publicId },
    });

    return profile;
  }

  async findIsUserById(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      select: { id: true },
      where: { id },
    });

    return user ? true : false;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  // todo: error handling
  async createUser(user: RequestCreateUser): Promise<ResponseCreateUser> {
    try {
      console.log(user);
      const createdUser = await this.prisma.user.create({
        data: user,
      });
      return createdUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateUser(user: RequestCreateUser): Promise<ResponseCreateUser> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: user,
      });
      return updatedUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
