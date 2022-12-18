const { Schema,  model, Types: { ObjectId } } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minlength: [6, "Title has to be at least 6 characters!"],
  },
  keyword: {
    type: String,
    required: [true, "Keyword is required!"],
    minlength: [6, "Keyword has to be at least 6 characters!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    maxlength: [15, "Location has to be maximum 15 characters!"],
  },
  creationDate: {
    type: String,
    required: [true, "Creation date is required!"],
    minlength: [10, "Creation date has to be 10 characters in the form of '02.02.2022'!"],
    maxlength: [10, "Creation date has to be 10 characters in the form of '02.02.2022'!"],
    validate:[/^\d\d\.\d\d\.\d\d\d\d$/i, "Date has to be in the format of '02.02.2022'!"],
  },
  imageUrl: {
    type: String,
    validate:[/^https?:\/\//i, "Invalid image url!"],
  },
  description: {
    type: String,
    minlength: [8, "Description has to be at least 8 characters!"],
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
  votes:[
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  ratings:{
    type: String,
    default: 0,
  }
});

const Post = model("Post", postSchema);

module.exports = Post;
