const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  Image: {
    type: String,
  },
})
categorySchema.method('toJSON', function(){
  const { __v, ...Object } = this.toObject();
  const{ _id:id, ...result } = Object;
  return { ...result, id };
});

exports.Category = mongoose.model("Category", categorySchema);
