import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import {
    USER_REPOSITORY,
    UserRepositoryInterface,
} from '../../user/repositories/user.repository.interface';
import { AuthTokenResponse } from '../interfaces/authtoken-response.interface';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { User } from 'src/modules/user/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepositoryInterface,
        private readonly jwtService: JwtService,
    ) { }

    async register(payload: RegisterDto): Promise<AuthTokenResponse> {
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const createUserPayload: CreateUserDto = {
            email: payload.email,
            password: hashedPassword,
            fullName: payload.fullName,
            role: 'customer',
        };

        const user = await this.userRepository.create(createUserPayload);
        const accessToken = await this.generateToken(user.id, user.email, user.role);

        return {
            token: accessToken,
            user,
        };
    }

    async login(payload: LoginDto): Promise<AuthTokenResponse> {
        const user = await this.userRepository.findByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(payload.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.generateToken(user.id, user.email, user.role);

        return {
            token: accessToken,

        };
    }

    private async generateToken(
        userId: string,
        email: string,
        role: 'admin' | 'customer',
    ): Promise<string> {
        return this.jwtService.signAsync({
            sub: userId,
            email,
            role,
        });
    }
}
