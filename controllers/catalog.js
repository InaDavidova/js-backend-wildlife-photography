const { getAllPosts } = require("../services/post");

module.exports = {
  async catalog(req, res) {
    const posts = await getAllPosts();
    res.render("all-posts", { posts, title: "All Posts" });
  },
};
