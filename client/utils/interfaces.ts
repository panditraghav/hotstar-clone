export interface IGenre {
    name: string;
}

export interface IFile {
    fileName: string;
    extension: string;
}

export interface IEpisode {
    _id?: string;
    number: number;
    video: IFile;
    name?: string;
}

export interface ISeason {
    _id?: string;
    number: number;
    episodes?: IEpisode[]
}

export interface IMovie {
    _id?: string;
    name: string;
    type: "movie";
    genres: IGenre[];
    video: IFile;
    description: string;
    bannerImage: IFile;
    cardImage: IFile;
}

export interface ISeries {
    _id?: string;
    name: string;
    type: "series";
    genres: IGenre[];
    description: string;
    bannerImage: IFile;
    cardImage: IFile;
    seasons: ISeason[];
}

export interface IShow {
    _id?: string;
    name: string;
    type: "movie" | "series";
    genres: IGenre[];
    video?: IFile;
    description: string;
    bannerImage: IFile;
    cardImage: IFile;
    seasons?: ISeason[];
}
