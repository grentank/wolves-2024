const jwtConfig = require('./jwtConfig');

const cookieConfig = {
  httpOnly: true,
  // secure: true,
  // sameSite: 'strict',
  maxAge: jwtConfig.refresh.expiresIn, // 12 hours
};

module.exports = cookieConfig;
