const { getPostById } = require("../services/post");

module.exports = {
  async details(req, res) {
    const id = req.params.id;
    const user = req.session.user;

    const post = await getPostById(id);

    let isOwner = false;

    let userHasVoted = false;

    if (user) {
      isOwner = user.id == post.author._id;
      const match = post.votes.find((el) => el._id == user.id);

      if (match) {
        userHasVoted = true;
      }
    }
    res.render("details", { post, isOwner, userHasVoted });
  },
};
