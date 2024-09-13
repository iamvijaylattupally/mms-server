import mongoose , {Schema} from 'mongoose'; 

const mentorSchema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    rollno:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    mentess:[
        {
            type:Schema.Types.ObjectId,
            ref:"Student"
        }
    ],
    mentessbranch:{
        type:String,
    },
    mentessyear:{
        type:Number,
    },
    mentesssem:{
        type:Number,
    },
    ismentor:{
        type:Boolean,
        default:true
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    refreshtoken:{
        type:String
    }
},
{timestamps:true}
)

export const Mentor = mongoose.model("Mentor", mentorSchema);