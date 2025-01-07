import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {Event} from "../models/calendar.model.js"; 

const addEvent = AsyncHandler(async (req, res) => {
    const { title, start, end } = req.body;

 
    if (!title || !start || !end) {
        throw new ApiError(400, "All fields (title, start, end) are required.");
    }

    if (new Date(start) >= new Date(end)) {
        throw new ApiError(400, "Start time must be earlier than end time.");
    }

  
    const newEvent = new Event({
        title,
        start: new Date(start),
        end: new Date(end),
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
        success: true,
        message: "Event added successfully",
        data:savedEvent
    })
});
const getAllEvents = AsyncHandler(async (req, res) => {
    const events = await Event.find(); // Fetch all events from the database

    if (!events || events.length === 0) {
        throw new ApiError(404, "No events found");
    }

    res.status(200).json({
        success: true,
        message: "Events retrieved successfully",
        data: events,
    });
});

export {
    addEvent,
    getAllEvents,
};
