import bcrypt from 'bcryptjs';
import slugify from 'slugify';
import { sign } from '../passport';
import UserSchema from '../schemas/UserSchema';

export default class UserModel {
  constructor() {
    this.Schema = UserSchema;
  }

  async getCurrentUser(userId) {
    const user = await this.Schema.findById(userId);
    if (!user) {
      throw new Error('That user does not exist.');
    }
    return this.tokenize(user);
  }

  async findOne(query) {
    return await this.Schema.findOne(query);
  }

  async login(data) {
    const user = await this.Schema.findOne({ normalizedEmail: data.email.toLowerCase() });
    if (!user) {
      throw new Error('Something went wrong; please try again.');
    }

    const passwordValid = this.checkPassword(data.password, user.password);
    if (passwordValid) {
      return this.tokenize(user);
    } else {
      throw new Error('Something went wrong; please try again.');
    }
  }

  async register(data) {
    this.validateEmail(data.email);
    this.validateUsername(data.username);

    const emailTaken = await this.Schema.findOne({ normalizedEmail: data.email.toLowerCase() });
    if (data.email && emailTaken) {
      throw new Error('That email address has already been used.');
    }

    const sluggedUsername = slugify(data.username, { lower: true });
    const userTaken = await this.Schema.findOne({ normalizedUsername: sluggedUsername });
    if (userTaken) {
      throw new Error('That username is already taken.');
    }

    data.password = this.hashPassword(data.password);
    data.username = slugify(data.username, ' ');
    data.normalizedEmail = data.email.toLowerCase();
    data.normalizedUsername = sluggedUsername;

    const user = await this.Schema.create(data);
    return this.tokenize(user);
  }

  async update(data, user) {
    if (data.email) {
      this.validateEmail(data.email);
      const emailTaken = await this.Schema.findOne({ normalizedEmail: data.email.toLowerCase() });
      if (emailTaken) {
        throw new Error('That email address has already been used.');
      }
    }

    if (data.username) {
      this.validateUsername(data.username);
      const sluggedUsername = slugify(data.username, { lower: true });
      const usernameTaken = await this.Schema.findOne({ normalizedUsername: sluggedUsername });
      if (usernameTaken) {
        throw new Error('That username has already been taken.');
      }
    }

    if (data.password) {
      const passwordValid = this.checkPassword(data.currentPassword, user.password);
      if (passwordValid) {
        data.password = this.hashPassword(data.password);
        delete data.currentPassword;
      } else {
        throw new Error('Current password is incorrect.');
      }
    }

    const updatedUser = await this.Schema.findByIdAndUpdate(data._id, data, { new: true });
    return this.tokenize(updatedUser);
  }

  validateUsername(username) {
    if (!username)
      throw new Error('You must choose a username');

    let test = /^[A-Za-z0-9\s]*$/.test(username);
    if (!test)
      throw new Error('Usernames must be only letters, numbers, and spaces');

    return;
  }

  validateEmail(email) {
    if (!email)
      throw new Error('You must provide an email address');

    const test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (!test)
      throw new Error('That is not a valid email.');
    return;
  }

  checkPassword(given, original) {
    return bcrypt.compareSync(given, original);
  }

  hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10));
  }

  tokenize(user) {
    const { _id, email, firstName, lastName, username, billOrder, accountOrder, projectOrder } = user;
    user = { _id, email, firstName, lastName, username, billOrder, accountOrder, projectOrder };
    const token = sign({ id: user._id, email: user.email });
    return { token, user };
  }
}