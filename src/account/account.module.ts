import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [CustomerModule, AdminModule]
})
export class AccountModule {}
