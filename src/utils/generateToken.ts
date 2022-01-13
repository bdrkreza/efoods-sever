import jwt from "jsonwebtoken";

/**
 * Generate a json web token for a user
 * @param id The id of the user
 */
const generateToken = (name: string, email: string, role: string) => {
  if (process.env.JWT_SECRET !== undefined) {
    return jwt.sign({ name, email, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
};

export default generateToken;
