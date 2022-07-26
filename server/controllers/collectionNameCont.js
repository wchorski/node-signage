const Model = require('../model/CollectionName')

exports.getAll = async (req, res) => {
  const models = await Model.find();
  if (!models) return res.status(204).json({ 'message': 'No data found' });
  // console.log(slides[1].imageData);
  // console.log( res.sendFile(__dirname + "../" + slides[1].imageData) );
  res.json(models);
}

exports.getOne = async (req, res) => {
  try{
    const model = await Model.findById(req.params.id)
    res.status(200).json(model)
    
  } catch (err) {
    console.error(err);
    res.status(400).json({status: 'failed col getOne',})
  }
}

exports.create = async (req, res) => {
  try{
    const newModel = await Model.create({
      ...req.body
    })

    res.status(200).json({
      status: 'successful create CollectionName',
      data: {
        ...newModel
      }
    })
  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed'})
  }
}

exports.delete = async (req, res) => {
  try{
    const model = await Model.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted model',
      model,
    })

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed model deletion',})
  }
}

exports.update = async (req, res, next) => {
  try{
    const mdl = await Model.findById(req.params.id)
    Object.assign(mdl, req.body)
    res.status(200).json(mdl)
    mdl.save()

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed to update mdl', message: err.toString()})
  }
}