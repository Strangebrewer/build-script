import UserModel from '../models/UserModel';
const userModel = new UserModel();

export default {
  async getCurrentUser(req, res) {
    try {
      const data = await userModel.getCurrentUser(req.user._id);
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController getCurrentUser:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async register(req, res) {
    try {
      const data = await userModel.register(req.body);
      res.status(201).json(data);
    } catch (err) {
      console.log('err in userController register:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const data = await userModel.login(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController login:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const data = await userModel.update(req.body, req.user);
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController update:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      
    } catch (err) {
      console.log('err in userController delete:::', err);
      res.status(400).send({ message: err.message });
    }
  }
}