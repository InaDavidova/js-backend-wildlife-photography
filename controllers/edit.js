const { updatePost, getPostById } = require("../services/post");
const mapErrors = require("../util/mapErrors");

module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const post = await getPostById(id);
    res.render("edit", { title: "Edit Post", post });
  },
  async post(req, res) {
    let { title, keyword, location, creationDate, imageUrl, description } = req.body;

    title = title.trim();
    keyword = keyword.trim();
    location = location.trim();
    creationDate = creationDate.trim();
    imageUrl = imageUrl.trim();
    description = description.trim();
    
    const id = req.params.id;
    
    const post = {
      title,
      keyword,
      location,
      creationDate,
      imageUrl,
      description,
    };

    try {
      await updatePost(id, post);
      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      console.log(err);
      res.render("edit", { title: "Edit Post", errors, post });
    }
  },
};
