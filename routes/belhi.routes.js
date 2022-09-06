const { Router } = require("express");
const router = Router();
const { belhiControllers } = require("../controllers/belhi.controller");
const middleware = require("../middlewares/middleware");

router.get("/belhi", belhiControllers.getBelhi);
router.post("/belhi", middleware, belhiControllers.addBelhi);
router.patch("/belhi/:id", middleware, belhiControllers.patchBeli);
router.delete("/belhi/:id", middleware, belhiControllers.deleteBelhi);

module.exports = router;
