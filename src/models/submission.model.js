import mongoose , {Schema} from 'mongoose'; 

const submissionSchema = new Schema({
    subject:{
        type:String,
        required:true,
    },
    assignmentid:{
        type:Schema.Types.ObjectId,
        ref:"Assignment",
        required:true,
    },
    slink:{
        type:String,
        required:true,
    },
    mentorid:{
        type:Schema.Types.ObjectId,
        ref:"Mentor",
        required:true,
    },
    issubmitted:{
        type:Boolean,
        default:false
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

export const Submission = mongoose.model("Submission", submissionSchema);