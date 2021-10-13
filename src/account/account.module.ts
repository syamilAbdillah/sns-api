import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [CustomerModule, AdminModule],
  exports: [AdminModule, CustomerModule]
})
export class AccountModule {}
