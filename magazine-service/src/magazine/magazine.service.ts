import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { Magazine } from './entities/magazine.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMagazineDto } from './dto/update-magazine.dto';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) {}

  create(createMagazineDto: CreateMagazineDto) {
    return this.magazineRepository.save({
      name: createMagazineDto.name,
      description: createMagazineDto.description,
      monthlyPrice: createMagazineDto.monthlyPrice,
    });
  }

  async findAll() {
    return await this.magazineRepository.find();
  }

  async findOne(id: number) {
    const magazine = await this.magazineRepository.findOne({ where: { id } });

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }
    return magazine;
  }

  async update(id: number, updateMagazineDto: UpdateMagazineDto) {
    const result = await this.magazineRepository.update(
      { id },
      updateMagazineDto,
    );

    if (!result.affected) {
      throw new NotFoundException('Magazine not found');
    }
  }

  async remove(id: number) {
    const result = await this.magazineRepository.softDelete({ id });
    if (!result.affected) {
      throw new NotFoundException('Magazine not found');
    }
  }
}
