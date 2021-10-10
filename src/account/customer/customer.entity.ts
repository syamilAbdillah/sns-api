import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Account } from '../entities/account.entity'

@Entity('customer')
export class Customer {

	@PrimaryColumn({ type: 'uuid' })
	accountId: string

	@OneToOne(type => Account)
	@JoinColumn({ name: 'accountId' })
	account: Account

	@Column()
	address: string

	@Column()
	addressOpt: string

	@Column()
	city: string

	@Column()
	phone: string
	
	@Column()
	postalCode: string
	
}
