const Belhi = require("../models/Belhi");
module.exports.belhiControllers = {
  getBelhi: async (req, res) => {
    try {
      const belhi = await Belhi.find().populate("User");
      res.json(belhi);
    } catch (e) {
      res.json({ error: `при попытке поиска белхов возникла  ошибка ${e}` });
    }
  },
  addBelhi: async (req, res) => {
    try {
      const data = await Belhi.create({
        name: req.body.name,
        text: req.body.text,
        creater: req.user,
      });
      res.json(data);
    } catch (e) {
      res.json({ error: `при попытке создать белхи ${e}` });
    }
  },
};
