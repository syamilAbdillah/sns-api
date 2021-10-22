import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    try {
      const category = this.categoryRepository.create(createCategoryDto)
      return this.categoryRepository.save(category)
    } catch(error) {
      return null
    }
  }

  async findAll(): Promise<any> {
    try {
      return this.categoryRepository.find()
    } catch(error) {
      return null
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      return this.categoryRepository.findOne(id)
    } catch(error) {
      return null
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    try {
      const category = this.categoryRepository.create({...updateCategoryDto, id})
      return this.categoryRepository.save(category)
    } catch(error) {
      return null
    }
  }

  async remove(id: string): Promise<any> {
    try {
      return this.categoryRepository.delete(id)
    } catch(error) {
      return null 
    }
  }
}
