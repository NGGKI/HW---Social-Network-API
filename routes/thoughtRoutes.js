const router = require("express").Router();
const { User, Thought } = require("../models");

//geting all thoughts
router.get("/thoughts", async (req, res) => {
  try {
    const users = await Thought.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//get a single thought by id
router.get("/thoughts/:id", async ({ params: { id } }, res) => {
  try {
    const user = await Thought.findById(id).populate("reactions");
    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//create new thought
/* example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino"  
} 
*/
router.post("/thoughts", async ({ body }, res) => {
  try {
    const thought = await Thought.create(body);
    await User.findOneAndUpdate(
      { username: thought.username },
      { $push: { thoughts: thought } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//change a thought
router.put("/thoughts/:id", async ({ params: { id }, body }, res) => {
  try {
    await Thought.findByIdAndUpdate(id, body);
    res.json({ message: "Successfully updated!" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

//delete a thoughts
router.delete("/thoughts/:id", async ({ params: { id } }, res) => {
  try {
    await Thought.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted!" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

//adding a reaction
/* sample
{
	"username": "lernantino",
	"reactionBody": "this is tetsing"
}
 */
router.post(
  "/thoughts/:thoughtId/reactions",
  async ({ params: { thoughtId }, body }, res) => {
    try {
      await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: body } },
        { runValidators: true, new: true }
      );
      res.json("Successfully added");
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

// delete a reaction
router.delete(
  "/thoughts/:thoughtId/reactions/:reactionId",
  async ({ params: { thoughtId, reactionId }, body }, res) => {
    try {
      await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { runValidators: true, new: true }
      );
      res.json("Successfully deleted");
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

module.exports = router;
