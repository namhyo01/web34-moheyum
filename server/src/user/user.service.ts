import { Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile-dto';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UserRepository } from 'src/common/database/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserData(userid: string): Promise<UserProfileDto> {
    return this.userRepository.findOneProfile({ userid });
  }

  async updateUserProfile(
    userid: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<{
    userId: string;
    nickName: string;
    bio: string;
    profileImg: string;
  }> {
    const data = await this.userRepository.findOneAndUpdate(
      { userid: userid },
      userUpdateDto,
    );
    return Promise.resolve({
      userId: data.userid,
      nickName: data.nickname,
      bio: data.bio,
      profileImg: data.profileimg,
    });
  }
}
