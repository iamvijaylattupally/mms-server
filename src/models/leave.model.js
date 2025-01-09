import mongoose,{Schema} from 'mongoose';


const leaveSchema = new Schema(
    {
        from:{
            type:String,
        },
        to:{
            type:String,
        },
        subject:{
            type:String,
        },
        body:{
            type:String,
        },
        salutation:{
            type:String,
        },
        applicationdate:{
            type:Date
        },
        isPending:{
            type:Boolean
        },
        isAccepted:{
            type:Boolean
        }
    },
    {
        timestamps:true
    }
)

export const Leave = mongoose.model("Leave", leaveSchema);