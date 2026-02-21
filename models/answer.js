const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const answerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: "Question" },
  answeredBy: String,
  content: String,
}, { timestamps: true });


const Answer=mongoose.model("Answer",answerSchema);
module.exports=Answer;
