const User = require('../model/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

exports.getUser = async (req, res) => {
  try{
    const user = await User.findById(req.params.id)

    res.status(200).json(user)

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed to user_details', message: err.toString()})
  }

  // if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
  // const user = await User.findOne({ _id: req.params.id }).exec();
  // if (!user) {
  //     return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  // }
  // res.json(user);
}

exports.update = async (req, res, next) => {

  try{
    const usr = await User.findById(req.params.id)

    const usrCryptPass = req.body;

    if(req.body.password){
      const hashedPwd = await bcrypt.hash(req.body.password, 10)
      usrCryptPass.password = hashedPwd
    }
    
    Object.assign(usr, usrCryptPass)
    res.status(200).json(usr)
    usr.save()

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed to update user', message: err.toString()})
  }
}

exports.deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted user',
      user,
    })

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed user deletion',})
  }

  // if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
  // const user = await User.findOne({ _id: req.body.id }).exec();
  // if (!user) {
  //     return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
  // }
  // const result = await user.deleteOne({ _id: req.body.id });
  // res.json(result);
}

// module.exports = {
//     getAllUsers,
//     deleteUser,
//     getUser
// }