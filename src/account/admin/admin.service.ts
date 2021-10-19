import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'
import { Account } from '../entities/account.entity'
import { Admin } from './admin.entity'

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Account)
		private accountRepository: Repository<Account>,
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>
	){}

	async findByEmail(email: string): Promise<any | undefined>{
		return this.accountRepository.findOne({email})
	}

	async create(adminDto: any){

		/**
		 * NOTE : INI MASIH SALAH !!
		 * SIMPEN DTO KE ACCOUNT REPO 
		 * TRUS SIMPEN ID NYA KE ADMIN REPO
		 * 
		 * have a nice day :)
		 * 
		 * */
		const saltRound = 10
		const salt = await bcrypt.genSalt(saltRound)
		const hashedPassword = await bcrypt.hash(adminDto.password, salt)
		const account = this.accountRepository.create(adminDto)
		const createdAccount = await this.accountRepository.save(account)
		// const admin = this.adminRepository.create({accountId: createdAccount.id})
		
		// return this.adminRepository.save(admin)

		return createdAccount
	}
}
