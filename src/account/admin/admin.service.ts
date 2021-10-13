import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
	private readonly admins = [
		{ id: 1, email: 'admin@admin.com', password: 'admin' },
		{ id: 2, email: 'admin2@admin.com', password: 'admin' }
	]

	async findByEmail(email: string): Promise<any | undefined>{
		return this.admins.find(admin => admin.email === email)
	}
}
