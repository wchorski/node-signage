const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ROLES_LIST = require('../config/roles_list');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'email and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser){
      console.log(`non-user login attempt: ${email}`);
      return res.sendStatus(401);
    } //Unauthorized 

    
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const email = foundUser.email
        const username = foundUser.username
        // create JWTs
        const accessToken = jwt.sign(
          {
            "UserInfo": {
              "email": foundUser.email,
              "username": foundUser.username,
              "roles": roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
          { "email": foundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '3h' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('username', username, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        const userRole = (array) => {
          let rl = ''
          array.forEach((role) => {
            switch(role) {
              case ROLES_LIST.Admin:
                return rl = 'admin';
              case ROLES_LIST.Editor:
                return  rl = 'editor';
              case ROLES_LIST.User:
                console.log('user is a USER');
                return rl = 'user';
              default:
                return rl = 'non-user';
            }
          })
          return rl
        }
        const roleCookie = userRole(roles)
        console.log(roleCookie);
        res.cookie('role', roleCookie, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ email, username, roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };