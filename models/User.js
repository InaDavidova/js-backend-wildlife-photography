const { Schema, model } = require("mongoose");

// Add reqiured fields and validation rules

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    minlength: [3, "Name has to be at least 3 characters"],
    validate: [/^[a-zA-Z]+$/, "Name should only consists of latin letters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    minlength: [5, "Last name has to be at least 5 characters"],
    validate: [/^[a-zA-Z]+$/, "Name should only consists of latin letters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    validate: [
      /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/,
      "Email is not valid! Ex. <name>@<domain>.<extention>",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    // minlength: will not work, because after hashing the password will have a different length //
  },
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;