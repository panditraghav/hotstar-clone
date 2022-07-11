import mongoose, { Types } from "mongoose";
import { Genre, GenreSchema, IGenre } from "./Genre";

export interface IVideo {
    _id: Types.ObjectId;
    fileName: string;
    mimeType: string;
}

interface IEpisode {
    _id: Types.ObjectId
    number: number;
    video: IVideo;
    name: string;
}

interface ISeason {
    _id: Types.ObjectId
    number: number;
    episodes: Types.DocumentArray<IEpisode>
}

export interface IShow {
    name: string;
    type: "movie" | "series";
    genres: Types.Array<IGenre>;
    video?: IVideo;
    thumbnailId: string;
    seasons?: Types.DocumentArray<ISeason>;
}


const ShowSchema = new mongoose.Schema<IShow>({
    name: { type: String, required: true },
    type: {
        type: String,
        required: true,
        emum: {
            values: ["movie", "series"],
            message: "{VALUE} is not supported"
        }
    },
    genres: {
        type: [GenreSchema],
        required: true,
    },
    video: {
        fileName: String,
        mimeType: String
    },
    thumbnailId: String,
    seasons: [{
        number: Number,
        episodes: [{
            number: Number,
            video: {
                fileName: String,
                mimeType: String
            },
            name: String
        }]
    }]
})

export const Show = mongoose.model<IShow>("Show", ShowSchema)