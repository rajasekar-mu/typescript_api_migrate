import * as debug from 'debug';
import { Router, Request, Response, NextFunction } from 'express';
import { UserSchema } from '../model/usersModel';
import { PostSchema } from '../model/postModel';
import * as mongoose from 'mongoose';
import axios from 'axios';
import * as multer from 'multer';
import * as fs from 'fs';

const User = mongoose.model('users', UserSchema);
const Post = mongoose.model('posts', PostSchema);

//** Image upload config **/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req, file, cb) {
  	//console.log(req);
    cb(null, Date.now() + file.originalname); //Appending .jpg
  }
})
var upload = multer({ storage: storage }).single('image');

export class UserRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.getUsers);
        this.router.get('/get-posts', this.getPosts);
        this.router.get('/migrate-posts', this.migratePosts);
        this.router.get('/migrate-users', this.migrateUsers);
        this.router.post('/upload-image/:id', this.saveImage);
    }

    public async migrateUsers (req: Request, res: Response) {

      const users = await axios.get('https://jsonplaceholder.typicode.com/users');
      if(users.status == 200 && users.data.length > 0){
        //res.send(users.data);//let newUser = new User();
        User.insertMany(users.data, (err, contact) => {
            if(err){
                res.send(err);
            }
            //console.log(posts,'-----');
            res.json({status:200,message:'Users added successfully'});
        });
      }else{
        res.send('no data found');
      }
    }

    public async migratePosts(req: Request, res: Response){

      const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const comments = await axios.get('https://jsonplaceholder.typicode.com/comments');

      if(posts.status == 200 && posts.data.length > 0){
        console.log('out',posts.data);
        Post.insertMany(posts.data, (err,post_res) => {
          if(err){
              res.send(err);
          }else{
            var comment_data = comments.data;
            comment_data.forEach(function(comment){
                //console.log(comment.postId,'--->id');
                let postId = comment.postId;
                delete comment.postId;
                Post.updateOne({ id:postId},{ $push: { comments: comment } }, (err,comm_res) => {
                  //console.log(err,'----',comm_res);
                });
            });
            res.json({status:200,message:'Post & comments added successfully'});
          }
        })
      }else{
        res.send('no data found');
      }
    }

    public getUsers (req: Request, res: Response) {
        User.find({}, (err, users_list) => {
            if(err){
                res.send(err);
            }
            res.json(users_list);
        });
    }

    public getPosts (req: Request, res: Response) {
        Post.find({}, (err, users_list) => {
            if(err){
                res.send(err);
            }
            res.json(users_list);
        });
    }

    public async saveImage (req: Request, res: Response) {

      var userId = req.params.id;
      //console.log(userId,'---');
      User.findOne({id : userId},(err, user_result) => {

        console.log(user_result);

        if(user_result){

            upload(req, res ,  (err,up_res) => {

              console.log(up_res);
              if(err) {
                  console.log(err);
                  res.json({"httpCode": 400,"Message": "file Error"});
              }else{
                //console.log(up_res);return false;
                // var old_file = '';
                // console.log(old_file);
                // if(old_file !== undefined){
                //     fs.unlink('./public/images/users/'+old_file, (err) => {
                //       //if (err) throw err;
                //       console.log('successfully deleted');
                //     });
                // }

                if(up_res.file.filename){

                  User.updateOne({_id : userId},{$set:{profile_image :up_res.file.filename}},(err,update_res) => {
                      res.json({"httpCode": 200,"Message": "Profile image changed"});
                  });
                }else{
                  res.sendStatus(400);
                }
              }
            })
        }else{
          res.json({"httpCode": 400,"Message": "user not found"});
        }
      })
    }
    
}

const userRoutes = new UserRouter();

export default userRoutes.router;
