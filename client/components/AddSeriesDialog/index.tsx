import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Stack, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import useSWR from "swr";
import SeasonsSection from "./SeasonsSection";
import { authFetcher } from "../../utils/fetcher";
import { IGenre, ISeason, ISeries } from "../../utils/interfaces";
import DeleteAlertDialog from "../DeleteAlertDialog";
import FileInput from "../FileInput";
import MultipleSelect from "../MultipleSelect";

interface Props {
    open: boolean;
    onClose: () => void
}

export default function AddSeriesDialog({ open, onClose }: Props) {
    //@ts-ignore
    const [seriesData, setSeriesData] = useState<Omit<ISeries, "_id">>({
        type: "series",
        name: "",
        description: "",
        bannerImage: { fileName: "", extension: "" },
        cardImage: { fileName: "", extension: "" },
        genres: [{ name: "" }],
    })
    const { data: genres, error: genreError } = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/genre/`,
    }, authFetcher)

    const [cardImageUploadProgress, setCardImageUploadProgress] = useState(0)
    const [bannerImageUploadProgress, setBannerImageUploadProgress] = useState(0)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    function handleClose() {
        onClose()
    }

    async function handleCardImageUpload(e) {
    }

    async function handleBannerImageUpload(e) {

    }

    function addSeason() {
        //@ts-ignore
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
            return {
                ...currentData,
                seasons: seasons
            }
        })
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
                    <FileInput
                        accepts="image/png, image/jpeg"
                        label="Card image"
                        onChangeHandler={handleCardImageUpload}
                        uploadProgress={cardImageUploadProgress}
                    />
                    <FileInput
                        accepts="image/png, image/jpeg"
                        label="Banner image"
                        onChangeHandler={handleBannerImageUpload}
                        uploadProgress={bannerImageUploadProgress}
                    />
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
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}