import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { encryptPassword } from '../common/utils/cryptogram'
import { UserLoginVO } from './VO/UserLoginVO'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  /**
   * 注册
   * @param createUserDto
   */
  async register(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.repeatPassword) {
      throw new HttpException('密码不一致', 400)
    }
    const oneByPhone = await this.findOneByPhone(createUserDto.phone)
    console.log('oneByPhone: ', oneByPhone)
    if (oneByPhone) {
      throw new HttpException('该号码已经被使用了', 400)
    }
    const password = encryptPassword(createUserDto.password)
    createUserDto.password = password
    createUserDto.repeatPassword = password
    await this.userRepository.save(this.userRepository.create(createUserDto))
  }

  async login(userLoginVO: UserLoginVO) {
    console.log('userLoginVO: ', userLoginVO)
    const user = await this.userRepository.findOne({
      where: {
        phone: userLoginVO.phone,
        password: encryptPassword(userLoginVO.password)
      }
    })
    if (!user) {
      throw new HttpException('帐号或密码错误', 400)
    }
    delete user.password
    delete user.updateAt
    delete user.updateAt
    return { ...user, token: Math.random() }
  }

  async findOneByPhone(phone: string): Promise<any | null> {
    return await this.userRepository.findOne({
      where: {
        phone
      }
    })
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
