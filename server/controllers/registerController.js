const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {

  const { email, user, pwd } = req.body;
  if (!email || !user || !pwd ) return res.status(400).json({ 'message': 'Username, email, & password are required.' });
  
  // check for duplicate usernames & email in the db
  const duplicateEmail = await User.findOne({ email: email }).exec();
  if (duplicateEmail) return res.status(409).json({message: "email already registered"}); //Conflict 
  const duplicateUsr = await User.findOne({ username: user }).exec();
  if (duplicateUsr) return res.status(409).json({message: "username already registered"}); //Conflict 

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      "email": email,
      "username": user,
      "password": hashedPwd
    });

    console.log(result);

    res.status(201).json({ 'success': `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

module.exports = { handleNewUser };