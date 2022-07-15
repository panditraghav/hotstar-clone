export interface IGenre {
    _id: string;
    name: string;
}

export interface IFile {
    _id: Types.ObjectId;
    fileName: string;
    extension: string;
}

interface IEpisode {
    _id: string;
    number: number;
    video: IVideo;
    name: string;
}

interface ISeason {
    _id: string;
    number: number;
    episodes: IEpisode[]
}

export interface IShow {
    _id: string;
    name: string;
    type: "movie" | "series";
    genres: IGenre[];
    video?: IFile;
    description: string;
    bannerImage: IFile;
    cardImage: IFile;
    seasons?: ISeason[];
}
