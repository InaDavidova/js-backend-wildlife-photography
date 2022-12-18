const Post = require("../models/Post");

async function createPost(post) {
  const result = new Post(post);
  await result.save();
}

async function getAllPosts() {
  const posts = await Post.find({}).lean();
  return posts;
}

async function getPostById(id) {
  const post = await Post.findById(id)
    .populate("author")
    .populate("votes")
    .lean();
  return post;
}

async function deletePost(id) {
  await Post.findByIdAndDelete(id);
}

async function updatePost(id, post) {
  await Post.findByIdAndUpdate(id, post, { runValidators: true });
}

async function getUserPosts(userId) {
  const car = await Post.find({ author: userId })
    .populate("author")
    .populate("ratings")
    .lean();
  return car;
}

async function vote(postId, userId, value) {
  const post = await Post.findById(postId);

  if (post.votes.includes(userId)) {
    throw new Error("User has already voted!");
  }

  post.votes.push(userId);

  if (value == "up") {
    post.ratings = Number(post.ratings) + 1;
  } else if (value == "down") {
    post.ratings = Number(post.ratings) - 1;
  }

  await post.save();
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getUserPosts,
  vote,
};
