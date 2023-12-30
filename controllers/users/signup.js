const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    throw HttpError(409, 'Such email already exists');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    name,
    password: hashPassword,
  };
  const user = await User.create(newUser);

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(201).json({ email: user.email, name: user.name, token });
};

module.exports = signup;
