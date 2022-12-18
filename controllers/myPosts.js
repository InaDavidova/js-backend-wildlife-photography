const { getUserPosts } = require("../services/post");

module.exports = {
  async myPosts(req, res) {
    const userId = req.session.user.id;

    const posts = await getUserPosts(userId);
    res.render("my-posts", { posts, title: "My Posts" });
  },
};
