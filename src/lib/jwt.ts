const jsonwebtoken = require("jsonwebtoken");

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user: any, expiresTime: any) {
  const _id = user._id;

  const filteredUserData = {
    role: user.role,
    _id: _id,
    status: user.status,
    email: user.status,
  };

  const payload = {
    ...filteredUserData,
    sub: _id,
    iat: new Date().getTime() / 1000,
  };

  const signedToken = jsonwebtoken.sign(payload, "thesecret", {
    algorithm: "HS256",
  });

  return "Bearer " + signedToken;
}

const verifyJWT = async (accessToken: any) => {
  try {
    const { sub, exp, role } = await jsonwebtoken.verify(
      accessToken,
      "thesecret"
    );
    return {
      sub: sub,
      exp: exp,
      role: role,
    };
  } catch (err) {
    return false;
  }
};

module.exports.issueJWT = issueJWT;
module.exports.verifyJWT = verifyJWT;
