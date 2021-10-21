import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService){
		super({ usernameField: 'email' })
	}

	async validate(email: string, password: string): Promise<any>{
		const admin = await this.authService.validate(email, password)
		
		if(!admin) throw new UnauthorizedException()
	
		return admin
	}
}