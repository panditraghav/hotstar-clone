export interface IVideo {
    _id: string;
    fileName: string;
    extension: string;
}
export interface IBanner {
    _id: string;
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
    name: string;
    type: "movie" | "series";
    genres: IGenre[];
    video?: IVideo;
    description: string;
    banner: IBanner;
    seasons?: ISeason[];
}
