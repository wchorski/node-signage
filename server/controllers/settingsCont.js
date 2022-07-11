const Model = require('../model/Settings');

exports.getAll = async (req, res) => {
  const mdl = await Model.find();
  if (!mdl) return res.status(204).json({ 'message': 'No settings found' });
  res.json(mdl);
}

exports.create = async (req, res, next) => {
  try{

    const newMdl = await Model.create({
      ...req.body
    })

    res.status(200).json({
      status: 'successful settings',
      data: {
        ...newMdl
      }
    })

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed POST catch createPost',})
  }
}

exports.update = async (req, res, next) => {
  try{
    const mdl = await Model.findById(req.params.id)
    Object.assign(mdl, req.body)
    res.status(200).json(mdl)
    mdl.save()

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed to update settings', message: err.toString()})
  }
}