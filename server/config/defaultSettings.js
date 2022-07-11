const Model = require('../model/Settings');
const fakeData = require('./defaultSettings.json')

const defaultSettings = async () => {
  const data = await Model.find();
  
  if (data.length === 0){

    console.log('*** *** *** *** *** ***');
    console.log('*** NO Settings FOUND. CREATING DEFAULT ***');
    console.log('*** *** *** *** *** ***');

    fakeData.forEach(async (setting) => {
      try{

        const createNew = await Model.create({
          ...setting
        })
    
        console.log('* new Setting -> ' + setting)
    
      } catch (err){
        console.error(err);
      }
    })
  }

}

module.exports = defaultSettings