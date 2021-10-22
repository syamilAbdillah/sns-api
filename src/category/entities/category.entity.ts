import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: false })
	name: string
}
