const fetch = require('node-fetch');
const Todo = require('../models/todo');
const User = require('../models/users');

const mongoose = require('mongoose');
const mongoDB = 'mongodb://test:abc123@ds249583.mlab.com:49583/practice';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.todos = function(req, res, next){
  Todo.countDocuments({}, function (err, count) {
    console.log('Todos count = ', count);
    if(count > 0){
      console.log('Todo count > 0, returning data from DB')
      Todo
      .find({})
      .exec(function(err, todos){
        if(err) { return next(err); }
        //Successful so render
        res.json(todos);
      });
    }
    else{
      console.log('ToDo - DB DOES NOT HAVE DATA. RETRIEVING NOW')
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        // .then(json => res.json(json))
        .then(json => {

          var todos = [];
          json.map(item => {
            const todo = new Todo(
              { 
                userId: item.userId, 
                title: item.title, 
                completed: item.completed 
              }
            );

            todo.save(function (err) {
              if (err) {
                cb(err, null);
                return;
              }
              console.log('New Todo:', todo);
              todos.push(todos);
            });
          });

          res.json(todos);
        });
    }
  });
};

exports.users = (req, res, next) => 
  mongoose.connection.db.listCollections({name: 'users'})
                        .next((error, usersData) => {
                          if(usersData){
                            console.log(usersData);
                            res.json(usersData)
                          } else {
                            res.json({ error: 'No user data' })
                          }
                        })






























  // User.countDocuments({}, function(err, count){
  //   if(err){res.json(err)}
  //   console.log('User Count is =', count);
  //   if(count > 0){
  //     console.log('Users are already in DB');
  //     User
  //       .find({})
  //       .exec(function(err, users){
  //         if(err){return next(err);}
  //         console.log('FOUND USERS')
  //         res.json(users);
  //       });
  //   }
  //   else{
  //     console.log('No Users in DB. Retrieving now.');
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //       .then(response => response.json())
  //       .then(json => {
  //         console.log('GOT USERS')
  //         var users = [];
  //         json.map(item => {
  //           const user = new User(
  //             {
  //               name: item.name,
  //               username: item.username,
  //               email: item.email,
  //               address: item.address,
  //               phone: item.phone,
  //               website: item.website,
  //               company: item.company
  //             }
  //           );
  
  //           user.save(function(err){
  //             if(err){ 
  //               cb(err, null);
  //               return;
  //             }
  //             console.log('New User: ', user)
  //             users.push(user);
  //           });
  //         });
  
  //         res.json(users);
  //       });
  //   }
  // });  
