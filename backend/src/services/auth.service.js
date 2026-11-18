const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/database");
const AppError = require("../utils/appError");

const publicUser = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
};

const createToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const register = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new AppError("An account with that email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), password: hashedPassword },
    select: publicUser,
  });

  return { user, token: createToken(user.id) };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const safeUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: publicUser,
  });

  return { user: safeUser, token: createToken(user.id) };
};

module.exports = { register, login };
