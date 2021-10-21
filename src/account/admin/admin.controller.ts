import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
	constructor( private adminService: AdminService ){}

	@Post()
	async create(@Body() adminDTO): Promise<any> {
		console.log(adminDTO)
		return this.adminService.create(adminDTO)
	}


}
