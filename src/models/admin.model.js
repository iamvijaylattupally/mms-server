import mongoose , {Schema} from 'mongoose';

const adminSchema = new Schema(
    {
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
        isadmin:{
            type:Boolean,
            default:true
        },
        ismentor:{
            type:Boolean,
            default:false
        },
        refreshtoken:{
            type:String
        }
    },
    {timestamps:true}
)

export const Admin = mongoose.model("Admin", adminSchema);