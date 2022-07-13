import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Theme, useTheme, Dialog, DialogActions, DialogContent, TextField, Button, DialogTitle, Stack, Alert, Box, CircularProgress, Select, MenuItem, OutlinedInput, Snackbar } from "@mui/material"
import { authFetcher } from "../utils/fetcher"
import { Done } from "@mui/icons-material";
import MultipleSelect from "./MultipleSelect";
import FileInput from "./FileInput";
import axios from "axios";

interface Props {
    open: boolean;
    onClose: () => void;
}
interface IMovieData {
    type: "movie";
    video: { fileName: string, extension: string } | null;
    banner: { fileName: string, extension: string } | null;
    name: string;
    genres: { name: string }[] | null;
    description: string;
}

export default function AddMovieDialog({ open, onClose }: Props) {
    const theme = useTheme()

    const [movieData, setMovieData] = useState<IMovieData>({
        type: "movie",
        video: null,
        banner: null,
        name: "",
        genres: null,
        description: ""
    })

    const [videoUploadProgress, setVideoUploadProgress] = useState(0)
    const [bannerUploadProgress, setBannerUploadProgress] = useState(0)
    const [genres, setGenres] = useState<string[]>([])
    const [originalGenres, setOriginalGenres] = useState(null)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    const videoInputRef = useRef<HTMLInputElement>()
    const bannerInputRef = useRef<HTMLInputElement>()


    useEffect(() => {
        setMovieData({
            ...movieData,
            genres: selectedGenres.map(genre => {
                return {
                    name: genre
                }
            })
        })
    }, [selectedGenres])

    useEffect(() => {
        async function fetchGenre() {
            try {
                const res = await axios.get(`${process.env.API_ROUTE}/genre`)
                setOriginalGenres(res.data)
                setGenres(res.data.map((genre) => genre.name))
            } catch (error) {
                console.log(error)
                setError("Some error occured")
            }
        }
        fetchGenre()
    })

    function handleAlertClose() {
        setError(null)
    }

    async function handleVideoUpload() {
        try {
            if (videoInputRef.current && videoInputRef.current.files) {
                const formData = new FormData()
                const file = videoInputRef.current.files[0]
                formData.append("video", file)
                const res = await authFetcher({
                    method: "post",
                    url: `${process.env.API_ROUTE}/video/`,
                    data: formData,
                    onUploadProgress: (p) => {
                        let progress = Math.round((p.loaded / p.total) * 100)
                        setVideoUploadProgress(progress)
                    }
                })

                setMovieData({
                    ...movieData,
                    video: { fileName: res.data.fileName, extension: res.data.extension },
                })
            }
        } catch (error) {
            setError("Some error occured")
        }
    }

    async function handleBannerUpload() {
        console.log("Banner upload")
        try {
            if (bannerInputRef.current && bannerInputRef.current.files) {
                const formData = new FormData()
                const file = bannerInputRef.current.files[0]
                formData.append("banner", file)
                const res = await authFetcher({
                    method: "post",
                    url: `${process.env.API_ROUTE}/image/`,
                    data: formData,
                    onUploadProgress: (p) => {
                        let progress = Math.round((p.loaded / p.total) * 100)
                        setBannerUploadProgress(progress)
                    }
                })
                console.log(res.data)
                setMovieData({
                    ...movieData,
                    banner: { fileName: res.data.fileName, extension: res.data.extension },
                })
            }
        } catch (error) {
            console.log(error)
            setError("Some error occured")
        }
    }

    function handleDescriptionChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setMovieData({
            ...movieData,
            description: e.target.value,
        })
    }

    function handleNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setMovieData({
            ...movieData,
            name: e.target.value,
        })
    }

    function canSubmit(): boolean {
        if (movieData.name !== "" && movieData.banner &&
            movieData.description !== "" &&
            movieData.video &&
            (movieData.genres && movieData.genres.length > 0))
            return true
        else return false
    }

    async function handleSubmit() {
        try {
            const res = await authFetcher({
                method: "post",
                url: `${process.env.API_ROUTE}/show`,
                data: {...movieData },
            })
            if (res.data.code) return setError("This movie already exists")
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Add Movie</DialogTitle>
            <DialogContent>
                <FileInput accepts="video/mp4" inputRef={videoInputRef} label="Upload Video" onChangeHandler={handleVideoUpload} uploadProgress={videoUploadProgress} />
                <FileInput accepts="image/png,image/jpeg" inputRef={bannerInputRef} label="Upload banner" onChangeHandler={handleBannerUpload} uploadProgress={bannerUploadProgress} />
                <Stack sx={{ my: 2 }}>
                    <TextField
                        id=""
                        label="Name"
                        value={movieData.name}
                        onChange={handleNameChange}
                    />
                </Stack>
                <MultipleSelect label="Genres" menuItems={genres} selectedItems={selectedGenres} setSelectedItems={setSelectedGenres} />
                <Box>
                    <TextField
                        value={movieData.description}
                        onChange={handleDescriptionChange}
                        multiline
                        fullWidth
                        rows={4}
                        label="Description"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancle</Button>
                <Button disabled={!canSubmit()} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
            <Snackbar open={error !== null} autoHideDuration={1000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}