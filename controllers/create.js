const { createPost } = require("../services/post");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("create", { title: "Create Post" });
  },
  async post(req, res) {
    let { title, keyword, location, creationDate, imageUrl, description } = req.body;
    const ownerId = req.session.user.id;

    title = title.trim();
    keyword = keyword.trim();
    location = location.trim();
    creationDate = creationDate.trim();
    imageUrl = imageUrl.trim();
    description = description.trim();

    const post = {
      title,
      keyword,
      location,
      creationDate,
      imageUrl,
      description,
      author: ownerId,
    };

    try {
      await createPost(post);
      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("create", { title: "Create Post", errors, post });
    }
  },
};
