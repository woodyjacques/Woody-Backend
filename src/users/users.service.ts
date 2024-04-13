import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserWoody } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserWoody)
    private readonly usersRepository: Repository<UserWoody>
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async updatePassword(email: string, newPassword: string) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    await this.usersRepository.update({ email }, { password: newPassword });
  }

  async findAllEmails() {
    const emails = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.email'])
      .getMany();
    const emailes = emails.map(user => user.email);
    return { emailes }
  }

  async updateVerifi(email: string, isVerified: boolean) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    await this.usersRepository.update({ email }, { isVerified: true });
  }

  async updatePasswordEmail(email: string, password: string) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    await this.usersRepository.update({ email }, { password: password });
  }

  async findAllUser() {
    const users = await this.usersRepository.find();

    const userInfo = users.map(user => ({
      name: user.name,
      email: user.email,
      paper: user.paper
    }));

    return userInfo;
  }

}
