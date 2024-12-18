import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2'
import { LoginDto } from './dto/login-dto';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const hashedPw = await argon2.hash(createUserDto.password);
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password:hashedPw,
      }
    });
    delete newUser.password;
    return newUser;
  }

  async login(loginData: LoginDto){
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {email: loginData.email, username: loginData.username}
    });
      if(await argon2.verify(await user.password, loginData.password)){
        const token = randomBytes(32).toString('hex');
        await this.prisma.token.create({
          data: {token,
            user: {
              connect: {id: user.id}
            }
          }
        })
        return{
          token: token,
          userId: user.id,
        }
      }else{
        throw new Error('Invalid password')
      }
    }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPw = await argon2.hash(updateUserDto.password);
    const updateUser = await this.prisma.user.update({where: {id},
      data: {
        ...updateUserDto,
        password:hashedPw,
      }
    });
    delete updateUser.password;
    return updateUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByToken(token: string) {
    const tokenData = await this.prisma.token.findUnique({
      where: { token },
      include: { user: true }
    })
    if (!tokenData) return null;
    const user = tokenData.user;
    delete user.password;
    
    return user;
  }
}