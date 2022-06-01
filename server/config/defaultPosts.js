const Post = require('../model/Post');
const fakePosts = require('./defaultPosts.json')


const defaultPosts = async () => {
  const posts = await Post.find();
  
  if (posts.length === 0){

    console.log('*** *** *** *** *** ***');
    console.log('*** NO POSTS FOUND. CREATING DEFAULT POSTS ***');
    console.log('*** *** *** *** *** ***');

    fakePosts.forEach(async (post) => {
      try{

        const newPost = await Post.create({
          ...post
        })
    
        console.log('*** Created default post ***');
        log(post.title)
    
      } catch (err){
        console.log(err);
      }
    })
  }

}

module.exports = defaultPosts