import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private authRepo: AuthRepository, private jwtService: JwtService) { }

    async register(name: string, email: string, password: string) {
        try {
            if (!name) {
                throw new BadRequestException('Name must not be empty');
            }
            if (!email) {
                throw new BadRequestException('Email must not be empty');
            }
            if (!password) {
                throw new BadRequestException('Password must not be empty');
            }
            if (password.length < 7) {
                throw new BadRequestException('Password must be at least 7 characters');
            }

            const existingUser = await this.authRepo.findByEmail(email);

            if (existingUser) throw new ConflictException('Email already registered');

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.authRepo.createUser(name, email, hashedPassword);

            return { message: 'User registered successfully' };
        } catch (error) {
            if (error instanceof ConflictException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to register user');
        }
    }


    async validateUser(email: string, password: string) {
        try {
            const user = await this.authRepo.findByEmail(email);
            if (!user) throw new UnauthorizedException('Email not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new UnauthorizedException('Invalid credentials');

            return user;
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException('Failed to validate user');
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await this.validateUser(email, password);
            const payload = { sub: user.id, email: user.email };
            const token = this.jwtService.sign(payload);
            return { access_token: token };
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException('Failed to login');
        }
    }
}
