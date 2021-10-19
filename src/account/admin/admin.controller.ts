import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { AdminService } from './admin.service';
import { AuthService } from '../../auth/auth.service'


@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService, 
    private readonly authService: AuthService
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  async login(@Request() req): Promise<any>{
    return await this.authService.login(req.user)
  }

  async create(adminDto): Promise<any> {
    return await this.adminService.create(adminDto)
  }
}
