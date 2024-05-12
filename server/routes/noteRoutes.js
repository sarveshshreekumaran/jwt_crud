const express = require("express");
const router = express.Router();
const {
  getController,
  postController,
  updateController,
  deleteController,
} = require("../controllers/noteControllers");
const { verifyAccessJwt } = require("../middlewares/verifyJwt");

router.get("/", verifyAccessJwt, getController);
router.post("/", verifyAccessJwt, postController);
router.put("/:id", verifyAccessJwt, updateController);
router.delete("/:id", verifyAccessJwt, deleteController);

module.exports = router;
