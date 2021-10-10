import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('account')
export class Account {

	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: false, unique: true })
	email: string

	@Column({ nullable: false })
	password: string

	@Column({ nullable: false })
	name: string

	@Column({ nullable: false })
	photo: string
}
