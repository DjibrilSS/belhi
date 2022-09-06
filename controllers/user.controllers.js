const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userControllers = {
  addUser: async (req, res) => {
    const passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_ROUNDS)
    );
    const user = await User.create({
      login: req.body.login,
      password: passwordHash,
    });
    res.json(user);
  },
  login: async (req, res) => {
    const candidate = await User.findOne({ login: req.body.login });
    if (!candidate) {
      return res.json({ error: "неправильный логин" });
    }
    const valid = await bcrypt.compare(req.body.compare, candidate.password);
    if (!valid) {
      return res.json({ error: "ошибка пароля" });
    }
    const payload = {
      id: candidate._id,
      login: candidate.login,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    res.json(token);
  },
};
