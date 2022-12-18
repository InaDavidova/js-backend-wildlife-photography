const { deletePost, getPostById,  } = require("../services/post");

module.exports = {
  async delPost(req, res) {
    const id = req.params.id;
    const post = await getPostById(id);
    
    let isOwner = false;

    if (req.session.user && req.session.user.id == post.author._id) {
      isOwner = true;
    }

    if (isOwner) {
      await deletePost(id);
      res.redirect("/");
    } else {
      res.redirect(`/details/${id}`);
    }
  },
};
