// import mongoose from 'mongoose';
import 'dotenv/config';
import '../connection';
import bcrypt from 'bcryptjs';

const pw = bcrypt.hashSync("1234", bcrypt.genSaltSync(10));
import UserSchema from '../schemas/UserSchema';

import usersSeed from './users.json';

async function seed() {
  try {
    await UserSchema.deleteMany({});

    usersSeed.forEach(u => u.password = pw);

    const users = await UserSchema.collection.insertMany(usersSeed);

    // log insertion counts:
    console.log("***********Aaaaaand, here's your insert counts:*************");
    console.log(users.insertedCount + " user records inserted!");

    // exit:
    process.exit(0);
  } catch (error) {
    console.log('error:::', error);
    process.exit(1);
  }
}

seed();
