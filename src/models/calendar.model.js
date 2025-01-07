import mongoose , {Schema} from 'mongoose';

// Define the event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Removes unnecessary whitespaces
    },
    start: {
        type: Date,
        required: true, // ISO 8601 format, e.g., "2024-12-22T10:00:00"
    },
    end: {
        type: Date,
        required: true, // ISO 8601 format, e.g., "2024-12-22T11:00:00"
    },
});


export const Event = mongoose.model("Event", eventSchema);


