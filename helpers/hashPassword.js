import bcrypt from "bcrypt";

const hashPassword = async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
};

const hashPasswordMiddleware = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export { hashPassword, hashPasswordMiddleware };
