import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm' 
import { Repository, Connection } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Admin } from '../entities/admin.entity'
import { Account } from '../entities/account.entity'



@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Admin) 
		private adminRepository: Repository<Admin>,
		@InjectRepository(Account)
		private accountRepository: Repository<Account>,
		@InjectConnection()
		private connection: Connection
	){}

	async findByEmail(email: string): Promise<any>{
		try {
			return this.adminRepository.find({
				where: {
					account: { email }
				},
				relations: ['account']
			})
		} catch(error) {
			console.log(error)

			return null
		}
	}

	async create(adminDTO): Promise<any>{
		const saltRound = 10
		const salt = await bcrypt.genSalt(saltRound)
		adminDTO.password = await bcrypt.hash(adminDTO.password, salt)


		const queryRunner = this.connection.createQueryRunner()

		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const account = this.accountRepository.create(adminDTO)
			const createdAccount = await queryRunner.manager.save(account)
			const accountId = queryRunner.manager.getId(createdAccount)

			const admin = this.adminRepository.create({accountId})
			const createdAdmin = await queryRunner.manager.save(admin)
			
			await queryRunner.commitTransaction()
			

			const result = JSON.parse(JSON.stringify(createdAccount))
			delete result.password

			return result
		} catch(error) {
			console.log('###',{error},'###')
			await queryRunner.rollbackTransaction()

			return null
		} finally {
			await queryRunner.release()
		}
	}
}
