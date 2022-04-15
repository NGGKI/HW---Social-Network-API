const router = require("express").Router();
const { User, Thought } = require("../models");

router.get("/thoughts", async (req, res) => {
  try {
    const users = await Thought.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/thoughts/:id", async ({ params: { id } }, res) => {
  try {
    const user = await Thought.findById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/thoughts", async ({ body }, res) => {
  try {
    const user = await Thought.create(body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// example data
/* {
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
} */
router.put("/thoughts/:id", async ({ params: { id }, body }, res) => {
  try {
    await Thought.findByIdAndUpdate(id, body);
    res.json({ message: "Successfully updated!" });
  } catch (err) {
    res.status(500).json({ err });
  }
});
router.delete("/thoughts/:id", async ({ params: { id } }, res) => {
  try {
    await Thought.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
