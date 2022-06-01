const ROLES = require('./roles_list')
const User = require('../model/User');
const bcrypt = require('bcrypt');
const defaultUsers = require('./defaultUsers.json')

const defaultAdmin  = async () => {

  // See if there is any users. 
  const users = await User.find();

  if (users.length === 0){

    console.log('*** *** *** *** *** *** *** *** *** *** *** *** *** ***');
    console.log('*** Default Users Created ***');

    defaultUsers.forEach(async (usr) => {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(usr.password, 10);
  
      //create and store the new user
      const result = await User.create({
        "email": usr.email,
        "username": usr.username,
        "roles": usr.roles,
        "password": hashedPwd
      });

      console.log(usr);
    })

    console.log('*** *** *** *** *** *** *** *** *** *** *** *** *** ***');
    console.log('*** *** *** *** *** *** *** *** *** *** *** *** *** ***');
    return null;
  } 

  // check to see if any of them have the role as Admin
  // TODO this isn't working. nested findOne
  // const anyAdmins = await User.findOne({ roles: {Admin: ROLES.Admin} }).exec();
  // if (anyAdmins) {
  //   console.log('at least one admin exists');
  // } else {
  //   console.log(anyAdmins);
  //   console.log('no admins exist');
  // }

  return null
}

module.exports = defaultAdmin