import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => (
        Object.assign(await getConnectionOptions(),{ autoLoadEntities: true })
      )
    }),
    AccountModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
