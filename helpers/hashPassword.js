import bcrypt from "bcrypt";

const hashPassword = async (next) => {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
};

const hashPasswordMiddleware = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export { hashPassword, hashPasswordMiddleware };
