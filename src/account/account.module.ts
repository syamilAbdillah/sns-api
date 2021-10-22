import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from './entities/account.entity'
import { Customer } from './entities/customer.entity'
import { Admin } from './entities/admin.entity'
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Admin, Customer]),
    AuthModule
  ],
  controllers: [AdminController, CustomerController],
  providers: [AdminService, CustomerService],
  exports: [AdminService, CustomerService]
})
export class AccountModule {}
