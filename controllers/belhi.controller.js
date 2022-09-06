const { populate } = require("../models/Belhi");
const Belhi = require("../models/Belhi");
module.exports.belhiControllers = {
  getBelhi: async (req, res) => {
    try {
      const belhi = await Belhi.find({}).populate("creater followers");
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
        creater: req.user.id,
      });
      res.json(data);
    } catch (e) {
      res.json({ error: `при попытке создать белхи ${e}` });
    }
  },
  patchBeli: async (req, res) => {
    try {
      const belhi = await Belhi.findById(req.params.id);
      await belhi.updateOne({ $addToSet: { followers: req.user.id } });
      res.json("вы подписались на белхи");
    } catch (e) {
      res.json({ error: `ошибка при попытке добавить фолловера:${e}` });
    }
  },
  deleteBelhi: async (req, res) => {
    try {
      const data = await Belhi.findByIdAndDelete(req.params.id);
      res.json(`белхи ${data.name} были удалены`);
    } catch (e) {
      res.json({ error: `ошибка при попытке удалить белхи:${e}` });
    }
  },
};
