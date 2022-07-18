import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { authFetcher } from "../../utils/fetcher";
import { IEpisode, ISeason } from "../../utils/interfaces";
import FileInput from "../FileInput";
import VideoUploader from "../VideoUploader";

interface Props {
    open: boolean;
    onClose: () => void;
    season: ISeason;
    handleEpisodeSave: (season: ISeason, episode: IEpisode) => void
}

export default function AddEpisodesDialog({ open, onClose, season, handleEpisodeSave }: Props) {
    const [episode, setEpisode] = useState<IEpisode>({
        number: season.episodes ? season.episodes[season.episodes.length - 1].number + 1 : 1,
        video: { fileName: "", extension: "" },
    })
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState({ isError: false, message: "" })

    useEffect(() => {
        setEpisode({
            number: season.episodes ? season.episodes.length + 1 : 1,
            video: { fileName: "", extension: "" },
        })
        setUploadProgress(0)
    }, [open])

    async function handleVideoUpload(e) {
        try {
            const formData = new FormData()
            formData.set("file", e.target.files[0])
            const res = await authFetcher({
                method: "post",
                url: `${process.env.API_ROUTE}/video`,
                data: formData,
                onUploadProgress: (p) => {
                    let progress = Math.round((p.loaded / p.total) * 100)
                    setUploadProgress(progress)
                }
            })
            console.log(res.data)
            setEpisode({ ...episode, video: { fileName: res.data.fileName, extension: res.data.extension } })
        } catch (error) {
            console.log(error)
        }
    }

    function handleSave() {
        if (season.episodes?.find((value) => value.number === episode.number)) {
            setError({ isError: true, message: "This episode number already exists" })
        } else {
            handleEpisodeSave(season, episode)
            onClose()
        }
    }

    function canSave() {
        if (episode.number && episode.video.fileName !== "") return true
        else return false
    }

    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={onclose}>
            <DialogTitle>
                Add Episode
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Number"
                    type={"number"}
                    value={episode.number}
                    onChange={(e) => setEpisode({ ...episode, number: Number(e.target.value) })}
                />
                <VideoUploader
                    accepts="video/mp4"
                    onChangeHandler={handleVideoUpload}
                    uploadProgress={uploadProgress}
                    id="episode-video"
                    video={episode.video}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={!canSave()} onClick={handleSave}>Save</Button>
            </DialogActions>
            <Snackbar open={error.isError} autoHideDuration={2000} onClose={() => setError({ isError: false, message: "" })}>
                <Alert severity="error">{error.message}</Alert>
            </Snackbar>
        </Dialog>
    )
}