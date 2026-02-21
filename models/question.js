const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  description: String,
  askedBy: String, // simple farmer name or id later
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
}, { timestamps: true });


const Question=mongoose.model("Question",questionSchema);
module.exports=Question;
