const Model = require('../model/CollectionName');
const fakeModels = require('./defaultCollections.json')


const defaultCollections = async () => {
  const models = await Model.find();
  
  if (models.length === 0){

    console.log('*** *** *** *** *** ***');
    console.log('*** NO COLLECTIONS FOUND ***');
    console.log('*** *** *** *** *** ***');

    fakeModels.forEach(async (mdl) => {
      try{

        const newModel = await Model.create({
          ...mdl
        })
    
        console.log('*** Created default model ***');
        console.log(mdl.collectionName)
    
      } catch (err){
        console.log(err);
      }
    })
  }

}

module.exports = defaultCollections