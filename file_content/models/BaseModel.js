import { endOfDay, startOfDay } from 'date-fns';

export default class BaseModel {
  constructor(model) {
    this.Schema = model;
  }

  async findById(id, fields = null, options = {}) {
    return await this.Schema.findById(id, fields, options);
  }

  find(query = {}, fields = null, options = {}) {
    const defaultOptions = {
      sort: {},
      limit: 0,
      skip: 0,
      populate: null
    };

    options = Object.assign(defaultOptions, options);
    return this.Schema.find(query, fields, options);
  }

  async findOne(query = {}, fields = null, options = {}) {
    return await this.Schema.findOne(query, fields, options);
  }

  async getCount() {
    const count = await this.Schema.countDocuments();
    return count;
  }

  async save(item) {
    if (item._id) {
      return await this.updateOne(item._id, item);
    } else {
      return await this.create(item);
    }
  }

  async create(data) {
    const created = new this.Schema(data);
    return await created.save();
  }

  async updateOne(_id, data) {
    const found = await this.Schema.findById(_id);
    Object.assign(found, data);
    return await found.save();
  }

  async updateMany(query, update) {
    return await this.Schema.updateMany(query, update);
  }

  async destroy(_id) {
    const found = await this.Schema.findOneAndRemove({ _id });
    if (!found) throw new Error('Item not found.');
    else return found;
  }

  async deleteMany(query) {
    return await this.Schema.deleteMany(query);
  }
}