const Post = require('../model/Post');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ 'message': 'No posts found' });
  res.json(posts);
}

exports.getPost = async (req, res) => {
  // console.log('--getpost');
  try{
    const post = await Post.findById(req.params.id)

    res.status(200).json(post)

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed to post details', message: err.toString()})
  }
}

exports.createPost = async (req, res, next) => {
  try{

    const newPost = await Post.create({
      ...req.body
    })

    res.status(200).json({
      status: 'successful createPost',
      // results: newPost.length, 
      data: {
        ...newPost
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed POST catch createPost',})
  }
}

exports.update = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id)
    Object.assign(post, req.body)
    res.status(200).json(post)
    post.save()

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed to update post', message: err.toString()})
  }
}

exports.deletePost = async (req, res) => {
  try{
    const post = await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted post',
      post,
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed post deletion',})
  }
}

// module.exports = {
//   getAllPosts,
//   deletePost,
//   getPost
// }