import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from './entities/account.entity'
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    CustomerModule, 
    AdminModule
  ],
  exports: [AdminModule, CustomerModule]
})
export class AccountModule {}
