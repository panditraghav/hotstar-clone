import { Add, ConstructionOutlined, Delete, Edit, StayCurrentLandscape } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Stack, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import useSWR from "swr";
import SeasonsSection from "./SeasonsSection";
import { authFetcher } from "../../utils/fetcher";
import { IEpisode, IGenre, ISeason, ISeries } from "../../utils/interfaces";
import DeleteAlertDialog from "../DeleteAlertDialog";
import FileInput from "../FileInput";
import MultipleSelect from "../MultipleSelect";
import ImageUploader from "../ImageUploader";

interface Props {
    open: boolean;
    onClose: () => void
}

export default function AddSeriesDialog({ open, onClose }: Props) {
    const [seriesData, setSeriesData] = useState<Partial<ISeries>>({
        type: "series",
    })
    const { data: genres, error: genreError } = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/genre/`,
    }, authFetcher)
    const [error, setError] = useState("")

    const [cardImageUploadProgress, setCardImageUploadProgress] = useState(0)
    const [bannerImageUploadProgress, setBannerImageUploadProgress] = useState(0)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    useEffect(() => {
        setSeriesData(currentData => {
            return {
                ...currentData,
                genres: selectedGenres.map(genre => { return { name: genre } })
            }
        })
    }, [selectedGenres])


    function handleClose() {
        onClose()
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
                setSeriesData((current) => {
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
                console.log(seriesData)
                setSeriesData((current) => {
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


    function addSeason() {
        setSeriesData(currentData => {
            let currentSeasons = currentData.seasons
            let lastSeason = 0
            if (currentSeasons && currentSeasons.length > 0) {
                lastSeason = currentSeasons[currentSeasons.length - 1].number
                return {
                    ...currentData,
                    seasons: [
                        ...currentSeasons,
                        {
                            number: lastSeason + 1
                        }
                    ]
                }
            } else {
                return {
                    ...currentData,
                    seasons: [
                        {
                            number: lastSeason + 1
                        }
                    ]
                }
            }
        })
    }

    function deleteSeason(id: number | string) {
        setSeriesData(currentData => {
            let seasons = currentData.seasons
            if (!seasons) return currentData
            return {
                ...currentData,
                seasons: seasons.filter((value) => value.number !== id)
            }
        })
    }

    function editSeason(newSeasonNubmer: number, index: number) {
        setSeriesData(currentData => {
            let seasons = currentData.seasons
            seasons[index].number = newSeasonNubmer
            seasons = seasons.sort((a, b) => a.number - b.number)
            return {
                ...currentData,
                seasons: seasons
            }
        })
    }

    function saveEpisode(season: ISeason, episode: IEpisode) {
        setSeriesData(currentData => {
            let newData = { ...currentData }
            let newSeasons = currentData.seasons.map(s => {
                if (s.number == season.number) {
                    if (!s.episodes) s.episodes = [episode]
                    else s.episodes.push(episode)
                    return s
                } else {
                    return s
                }
            })
            newData.seasons = newSeasons
            return newData
        })
    }

    async function handleSaveSeries() {
        try {
            const res = authFetcher({
                method: "post",
                url: `${process.env.API_ROUTE}/show`,
                data: seriesData
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setError("Some error occured!")
        }
        onClose()
    }

    function canSave(): boolean {
        console.log(seriesData)
        if (seriesData.name && seriesData.name !== "" &&
            seriesData.description && seriesData.description !== "" &&
            seriesData.bannerImage && seriesData.cardImage &&
            seriesData.seasons && seriesData.seasons.length > 0) return true
        else return false
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Add Series</DialogTitle>
                <DialogContent>
                    <Stack direction="row" gap={4}>
                        <Box width={"30%"}>
                            <InputLabel htmlFor="seriesName">Name</InputLabel>
                            <TextField
                                value={seriesData.name}
                                id="seriesName"
                                variant="outlined"
                                placeholder="Name"
                                onChange={(e) => setSeriesData({ ...seriesData, name: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Box width={"100%"}>
                            <InputLabel htmlFor="seriesDescription">Description</InputLabel>
                            <TextField
                                value={seriesData.description}
                                id="seriesDescription"
                                placeholder="Description"
                                variant="outlined"
                                onChange={(e) => setSeriesData({ ...seriesData, description: e.target.value })}
                                fullWidth
                            />
                        </Box>
                    </Stack>
                    <Stack direction="row" width="100%" gap={2}>
                        <FileInput
                            label="Card Image"
                            onChangeHandler={handleCardImageUpload}
                            uploadProgress={cardImageUploadProgress}
                            accepts="image/jpeg, image/png"
                        />
                        <FileInput
                            label="Banner image"
                            onChangeHandler={handleBannerImageUpload}
                            uploadProgress={bannerImageUploadProgress}
                            accepts="image/jpeg, image/png"
                        />

                    </Stack>
                    <MultipleSelect
                        label="Genres"
                        menuItems={genres?.data ? genres.data.map(genre => genre.name) : []}
                        selectedItems={selectedGenres}
                        setSelectedItems={setSelectedGenres}
                    />
                    <hr />
                    <Box my={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box className="text-xl underline">Seasons</Box>
                            <Stack direction="row">
                                <button onClick={addSeason}><Add sx={{ "&:hover": { color: "primary.main" } }} /></button>
                            </Stack>
                        </Stack>
                        <SeasonsSection
                            seasons={seriesData.seasons}
                            handleDeleteSeason={deleteSeason}
                            handleEditSeason={editSeason}
                            handleEpisodeSave={saveEpisode}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!canSave()} onClick={handleSaveSeries}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}