import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Category } from '../../category/entities/category.entity'

@Entity('product')
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	price: number

	@Column()
	stock: number

	@Column({ default: false })
	recomended: boolean

	@Column({ type: 'text' })
	desc: string

	@ManyToMany(() => Category)
	@JoinTable()
	categories: Category[]
}
