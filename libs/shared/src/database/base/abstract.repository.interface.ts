import { FilterQuery, UpdateQuery } from 'mongoose';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractRepositoryInterface<T> {
  abstract find(query: FilterQuery<T>): Promise<T>;
  abstract findOne(query: FilterQuery<T>): Promise<T>;
  abstract findOneAndUpdate(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T>;
  abstract create(document: Omit<T, '_id'>): Promise<T>;
  abstract createIndex(options: CreateIndexesOptions): Promise<T>;
  abstract findOneAndDelete(query: FilterQuery<T>): Promise<T>;
}
