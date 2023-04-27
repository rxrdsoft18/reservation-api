import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  protected constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<T>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }
}
