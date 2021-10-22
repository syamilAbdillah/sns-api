import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpreation: false,
			secretOrKey: 'YOUR_SECRET_KEY'
		})
	}

	async validate(payload: any){
		const adminData = await this.authService.validateToken(payload)

		if(!adminData) throw new UnauthorizedException()

		return adminData
	}
}