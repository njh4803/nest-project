/* eslint-disable prettier/prettier */
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const commentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.catModel.find().populate('comments', commentsModel);
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    return newCat.readOnlyData;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({email});
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }
}
