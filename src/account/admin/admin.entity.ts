import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { Account } from '../entities/account.entity'

@Entity('admin')
export class Admin {

	@PrimaryColumn({ type: 'uuid' })
	accountId: string

	@OneToOne(type => Account)
	@JoinColumn({ name: 'accountId' })
	account: Account
}
