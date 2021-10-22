import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AdminService } from '../account/admin/admin.service'

@Injectable()
export class AuthService {
	constructor(
		private adminService: AdminService,
		private jwtService: JwtService
	){}

	async validate(email: string, password: string): Promise<any>{
		const admin = await this.adminService.findByEmail(email)

		if(!admin) return null

		const isValidPassword = await bcrypt.compare(password, admin.password)

		if(!isValidPassword) return null

		const { password: _ignoreMe, ...result } = admin
		return result
	}

	async validateToken(payload): Promise<any>{
		const admin = await this.adminService.findById(payload.id)

		if(!admin){
			return null 
		}

		return admin
	}


	async login(admin: any): Promise<any> {
		

		const payload = {
			email: admin.email,
			id: admin.id
		}

		return {access_token: this.jwtService.sign(payload)}
	}
}
