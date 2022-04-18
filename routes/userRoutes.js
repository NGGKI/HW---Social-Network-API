const router = require("express").Router();
const { User, Thought } = require("../models");

//find all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//find a user
router.get("/users/:id", async ({ params: { id } }, res) => {
  try {
    const user = await User.findById(id)
      .populate("thoughts")
      .populate("friends");
    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

// create new user
router.post("/users", async ({ body }, res) => {
  try {
    const user = await User.create(body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

/* example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
} */

// update a user
router.put("/users/:id", async ({ params: { id }, body }, res) => {
  try {
    await User.findByIdAndUpdate(id, body);
    res.json({ message: "Successfully updated!" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

//delete a user
router.delete("/users/:id", async ({ params: { id } }, res) => {
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

//post a friend
router.post(
  "/users/:id/friends/:friendId",
  async ({ params: { id, friendId } }, res) => {
    try {
      await User.findByIdAndUpdate(
        { _id: id },
        { $push: { friends: friendId } },
        { new: true }
      );
      res.json("Successfully added");
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

//delete a friend
router.delete(
  "/users/:id/friends/:friendId",
  async ({ params: { id, friendId } }, res) => {
    try {
      await User.findByIdAndUpdate(
        { _id: id },
        { $pull: { friends: friendId } },
        { new: true }
      );
      res.json("Successfully deleted");
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

module.exports = router;
