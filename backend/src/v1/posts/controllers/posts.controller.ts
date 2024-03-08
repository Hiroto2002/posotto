import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../services/post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConvertTextDto } from '../dto/convert-text.dto';

@Controller('v1/posts')
export class PostsController {
  constructor(private readonly appService: PostService) {}

  // 認証の有無で処理を分けているが、通さないべきなので、修正が必要
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAllPosts(@Request() req) {
    if (!req.user) {
      return  this.appService.findAllPosts({ user_id: null });
    } else {
      return  this.appService.findAllPosts({ user_id: req.user.userId });
    }
  }

  @Get('/:PostId')
  async getPostDetail(@Param('PostId') postId: number) {
    return  this.appService.getPostDetail({ postId:  Number(postId) });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    console.log(req.user);
    return  this.appService.createPost({
      ...createPostDto,
      user_id: req.user.userId,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/voice')
  async convertText(@Body() ConvertTextDto: ConvertTextDto) {
    console.log('-----------voice-----------');
    return  this.appService.convertText(ConvertTextDto);
  }

  @Delete('/:PostId')
  async deletePost(@Param('PostId') postId: number) {
    return  this.appService.deletePost( Number(postId) );
  }

  // @Post('/voice')
  // @UseInterceptors(FileInterceptor('content'))
  // async convertVoiceToText(
  //   @UploadedFile() content: Express.Multer.File,
  //   @Request() req,
  // ) {
  //   return await this.appService.convertVoiceToText(content);
  // }
}
