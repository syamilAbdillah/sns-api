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

	/**
	 *	this function required in auth service,
	 * to find existing user with given email 
	 * 
	 * 
	 */ 
	async findByEmail(email: string): Promise<any>{
		try {
			return this.accountRepository.findOne({ email })
		} catch(error) {
			console.log(error)

			return null
		}
	}



	/**
	 * create new account with role admin,
	 * 
	 */
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

	/**
	 * get list of existing account with role admin
	 * 
	 */ 
	async findAll(): Promise<any>{
		return this.adminRepository.find({
			relations: ['account']
		})
	}


	/**
	 * get specific admin
	 *  
	 */
	async findById(id: string): Promise<any>{
		return this.accountRepository.findOne(id)
	}


	/**
	 * update admin own data 
	 * 
	 */
  	async update(updateDTO, id): Promise<any>{
		const account = this.accountRepository.create({...updateDTO, id})
		return this.accountRepository.save(account)
  	}

	/**
	 * remove admin account
	 *  
	 */
	async remove(id): Promise<any>{
		return {}
	}
}
