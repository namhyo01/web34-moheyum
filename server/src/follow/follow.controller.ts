import {
  UseGuards,
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}
  @HttpCode(200)
  @Post('/following/:targetid')
  @UseGuards(JwtAuthGuard)
  async followUser(@Param('targetid') targetid: string, @GetUser() user: User) {
    return {
      message: 'success',
      data: {
        followCount: await this.followService.followUser(targetid, user),
      },
    };
  }

  @Get('/check/:targetid')
  @UseGuards(JwtAuthGuard)
  async followCheck(
    @Param('targetid') targetid: string,
    @GetUser() user: User,
  ) {
    return {
      message: 'success',
      data: {
        isFollow: await this.followService.followCheck(targetid, user),
      },
    };
  }

  @HttpCode(200)
  @Delete('/following/:targetid')
  @UseGuards(JwtAuthGuard)
  async followCancel(
    @Param('targetid') targetid: string,
    @GetUser() user: User,
  ) {
    return {
      message: 'success',
      data: {
        followCancel: await this.followService.followCancel(targetid, user),
      },
    };
  }

  @Get('/list/follower')
  @UseGuards(JwtAuthGuard)
  async followerList(@Query('page') page: number, @GetUser() user: User) {
    const list = await this.followService.getFollowerList(user, page);
    return {
      message: 'success',
      data: list,
    };
  }

  @Get('/list/following')
  @UseGuards(JwtAuthGuard)
  async followingList(@Query('page') page: number, @GetUser() user: User) {
    const list = await this.followService.getFollowingList(user, page);
    return {
      message: 'success',
      data: list,
    };
  }
}
