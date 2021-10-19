import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './admin.entity'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { AuthModule } from '../../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AuthModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
