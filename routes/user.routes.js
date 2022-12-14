const { Router } = require("express");
const router = Router();
const { userControllers } = require("../controllers/user.controllers");

router.get("/user", userControllers.getUser);
router.post("/user", userControllers.addUser);
router.post("/user/login", userControllers.login);

module.exports = router;
