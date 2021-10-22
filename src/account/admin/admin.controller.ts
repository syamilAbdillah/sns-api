import { Controller, Post, Get, Put, Delete, Body, Req, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { LocalAuthGuard } from '../../auth/local-auth.guard'
import { AuthService } from '../../auth/auth.service'
import { AdminService } from './admin.service'


@Controller('admin')
export class AdminController {
	constructor( 
		private adminService: AdminService,
		private authService: AuthService
	){}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() adminDTO): Promise<any> {
		return this.adminService.create(adminDTO)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async list(): Promise<any>{
		return this.adminService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async detail(@Param() params): Promise<any>{
		return this.adminService.findById(params.id)
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	async update(@Body() body, @Req() req): Promise<any>{
		return this.adminService.update(body, req.user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param() params): Promise<any>{
		return this.adminService.remove(params.id)
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req): Promise<any>{
		return this.authService.login(req.user)
	}
}
