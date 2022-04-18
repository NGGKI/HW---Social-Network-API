const router = require("express").Router();

router.use("/api", require("./userRoutes"));
router.use("/api", require("./thoughtRoutes"));

router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
