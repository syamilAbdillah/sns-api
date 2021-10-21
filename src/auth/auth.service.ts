import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { AdminService } from '../account/admin/admin.service'

@Injectable()
export class AuthService {
	constructor(
		private adminService: AdminService,
		private jwtService: JwtService
	){}

	async validate(email: string, password: string): Promise<any>{
		const admin = await this.adminService.findByEmail(email)

		const isValidPassword = await bcrypt.compare(password, admin.password)

		if(admin && isValidPassword){
			const { password, ...result } = admin
			return result
		}

		return null
	}
	async login(admin: any): Promise<any> {
		const payload = {
			email: admin.email,
			sub: admin.id
		}

		return {access_token: this.jwtService.sign(payload)}
	}
}
