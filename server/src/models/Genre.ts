import mongoose, { Types } from "mongoose";

export interface IGenre {
    _id: Types.ObjectId;
    name: string;
}

export const GenreSchema = new mongoose.Schema<IGenre>({
    name: { type: String, required: true, unique: true }
})

export const Genre = mongoose.model("Gnere", GenreSchema)