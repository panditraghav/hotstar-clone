import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Theme, useTheme, Dialog, DialogActions, DialogContent, TextField, Button, DialogTitle, Stack, Alert, Box, CircularProgress, Select, MenuItem, OutlinedInput, Snackbar } from "@mui/material"
import { authFetcher } from "../utils/fetcher"
import { Done } from "@mui/icons-material";
import MultipleSelect from "./MultipleSelect";
import FileInput from "./FileInput";
import axios from "axios";
import { IMovie } from "../utils/interfaces";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function AddMovieDialog({ open, onClose }: Props) {
    const theme = useTheme()

    const [movieData, setMovieData] = useState<Omit<IMovie, "_id">>({
        name: "",
        bannerImage: { fileName: "", extension: "" },
        cardImage: { fileName: "", extension: "" },
        video: { fileName: "", extension: "" },
        description: "",
        genres: [{ name: "" }],
        type: "movie"
    })
    const [videoUploadProgress, setVideoUploadProgress] = useState(0)
    const [bannerImageUploadProgress, setBannerImageUploadProgress] = useState(0)
    const [cardImageUploadProgress, setCardImageUploadProgress] = useState(0)
    const [genres, setGenres] = useState<string[]>([])
    const [originalGenres, setOriginalGenres] = useState(null)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMovieData({
            ...movieData,
            genres: selectedGenres.map(genre => {
                return {
                    name: genre
                }
            })
        })
        console.log("Movie Data", movieData)
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
    }, [])

    function handleAlertClose() {
        setError(null)
    }

    async function handleVideoUpload(e) {
        let file = e.target.files[0]
        try {
            if (file) {
                const formData = new FormData()
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
                console.log(res.data)
                setMovieData((current) => {
                    return {
                        ...current,
                        video: { fileName: res.data.fileName, extension: res.data.extension },
                    }
                })
                console.log(movieData)
            }
        } catch (error) {
            setError("Some error occured")
        }
    }

    async function handleBannerImageUpload(e) {
        let file = e.target.files[0]
        try {
            if (file) {
                const formData = new FormData()
                formData.append("bannerImage", file)
                const res = await authFetcher({
                    method: "post",
                    url: `${process.env.API_ROUTE}/image/`,
                    data: formData,
                    onUploadProgress: (p) => {
                        let progress = Math.round((p.loaded / p.total) * 100)
                        setBannerImageUploadProgress(progress)
                    }
                })
                console.log(res.data)
                setMovieData((current) => {
                    return {
                        ...current,
                        bannerImage: { fileName: res.data.fileName, extension: res.data.extension },
                    }
                })
            }
        } catch (error) {
            console.log(error)
            setError("Some error occured")
        }
    }

    async function handleCardImageUpload(e) {
        const file = e.target.files[0]
        try {
            if (file) {
                const formData = new FormData()
                formData.append("cardImage", file)
                const res = await authFetcher({
                    method: "post",
                    url: `${process.env.API_ROUTE}/image/`,
                    data: formData,
                    onUploadProgress: (p) => {
                        let progress = Math.round((p.loaded / p.total) * 100)
                        setCardImageUploadProgress(progress)
                    }
                })
                console.log(res.data)
                setMovieData((current) => {
                    return {
                        ...current,
                        cardImage: { fileName: res.data.fileName, extension: res.data.extension },
                    }
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

    function checkCanSubmit() {
        if (movieData.name && movieData.name !== "" && movieData.bannerImage.extension != "" && movieData.cardImage.fileName != "" && movieData.description !== "" && movieData.video?.fileName !== "" && movieData.genres && movieData.genres.length > 0) return true
        return false
    }

    async function handleSubmit() {
        try {
            const res = await authFetcher({
                method: "post",
                url: `${process.env.API_ROUTE}/show`,
                data: { ...movieData, type: "movie" },
            })
            console.log(res.data)
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
                <FileInput accepts="video/mp4" label="Upload Video" onChangeHandler={handleVideoUpload} uploadProgress={videoUploadProgress} />
                <FileInput accepts="image/png,image/jpeg" label="Upload banner Image" onChangeHandler={handleBannerImageUpload} uploadProgress={bannerImageUploadProgress} />
                <FileInput accepts="image/png,image/jpeg" label="Upload card Image" onChangeHandler={handleCardImageUpload} uploadProgress={cardImageUploadProgress} />
                <Stack sx={{ my: 2 }}>
                    <TextField
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
                <Button onClick={onClose}>Cancel</Button>
                <Button disabled={!checkCanSubmit()} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
            <Snackbar open={error !== null} autoHideDuration={1000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}