import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => (
        Object.assign(await getConnectionOptions(),{ autoLoadEntities: true })
      )
    }),
    AccountModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
