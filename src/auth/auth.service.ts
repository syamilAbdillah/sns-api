import { Injectable } from '@nestjs/common';
import { AdminService } from '../account/admin/admin.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private adminService: AdminService,
		private jwtService: JwtService
	){}

	async validateAdmin(email: string, password: string): Promise<any>{
		const admin = await this.adminService.findByEmail(email)

		if(admin && admin.password == password){
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
