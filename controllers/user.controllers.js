const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userControllers = {
  getUser: async (req, res) => {
    try {
      const user = await User.find();
    } catch (e) {}
  },
  addUser: async (req, res) => {
    try {
      const passwordHash = await bcrypt.hash(
        req.body.password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        login: req.body.login,
        password: passwordHash,
      });
      res.json(user);
    } catch (e) {
      res.json({ error: `ошибка при попытке добавить пользователя:${e}` });
    }
  },
  login: async (req, res) => {
    try {
      const candidate = await User.findOne({ login: req.body.login });
      if (!candidate) {
        return res.json({ error: "неправильный логин" });
      }
      const valid = await bcrypt.compare(req.body.password, candidate.password);
      if (!valid) {
        return res.json({ error: "ошибка пароля" });
      }
      const payload = {
        id: candidate._id,
        login: candidate.login,
      };
      const token = await jwt.sign(payload, process.env.SECRET_KEY);
      return res.json(token);
    } catch (e) {
      res.json({ error: `ошибка при попытке залогиниться: ${e}` });
    }
  },
};
