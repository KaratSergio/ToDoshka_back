import bcrypt from "bcrypt";

const comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default comparePassword;
