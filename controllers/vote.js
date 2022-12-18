const { vote } = require("../services/post");

module.exports = {
  async vote(req, res) {
    const postId = req.params.id;
    const value = req.params.value;
    const userId = req.session.user.id;

    await vote(postId, userId, value);
    res.redirect(`/details/${postId}`);
  },
};
