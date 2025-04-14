import mongoose , {Schema} from 'mongoose'; 

const assignmentSchema = new Schema({
    subject:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    mentorid:{
        type:Schema.Types.ObjectId,
        ref:"Mentor",
        required:true,
    },
    submissiondate:{
        type:Date,
        required:true
    },
    targets:[
        {
            type:Schema.Types.ObjectId,
            ref:"Student"
        }
    ],
    submissions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Submission"
        }
    ],
})

export const Assignment = mongoose.model("Assignment", assignmentSchema);