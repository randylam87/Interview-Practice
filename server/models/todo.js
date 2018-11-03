const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
  }
);

TodoSchema
  .virtual('task')
  .get(function(){
    return this.title;
  });

TodoSchema
  .virtual('url')
  .get(function() {
    return '/api/todo/' + this._id;
  });


//Export model
module.exports = mongoose.model('Todo', TodoSchema);