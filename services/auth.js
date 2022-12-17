const User = require("../models/User");
const { hash, compare } = require("bcrypt");

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function register(firstName, lastName, email, password) {
  const hashedPassword = await hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
}

async function login(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const hasMatch = await compare(password, user.password);

  if (!hasMatch) {
    throw new Error("Incorrect email or password");
  }

  return user;
}

module.exports = { register, login };
