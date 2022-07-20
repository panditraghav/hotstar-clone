import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, IconButton, Stack, Typography, } from "@mui/material";
import { Add, Delete, Edit, Expand, ExpandMore } from "@mui/icons-material";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { ISeason } from "../../utils/interfaces";
import { useState } from "react"
import EditSeasonDialog from "./EditSeasonDialog";
import AddEpisodesDialog from "./AddEpisodesDialog";

interface SeasonsSectionProps {
    seasons: ISeason[],
    handleDeleteSeason: (id: number | string) => void
    handleEditSeason: (newSeasonNumber: number, index: number) => void
    handleEpisodeSave: (season: ISeason, episode: IEpisode) => void
}

export default function SeasonsSection({ seasons, handleDeleteSeason, handleEditSeason, handleEpisodeSave }: SeasonsSectionProps) {
    const [deleteSeasonDialog, setDeleteSeasonDialog] = useState({ open: false, number: 0 })
    const [addEpisode, setAddEpisode] = useState<{
        open: boolean,
        season: ISeason
    }>({
        open: false,
        season: { number: -1 }
    })
    const [editSeasonDialog, setEditSeasonDialog] = useState<{
        open: boolean, seasonNumber: number, index: number
    }>({
        open: false, seasonNumber: - 1, index: -1
    })

    return (
        <>
            {seasons && seasons.map((season, index) => {
                return (
                    <Accordion key={season.number} sx={{ mt: 2 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>Season {season.number}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {season.episodes && season.episodes.map(episode => {
                                return (
                                    <Stack key={episode.number} direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography>Episode {episode.number}</Typography>
                                        <Box>
                                            <IconButton>
                                                <Delete sx={{ color: "warning.main" }} />
                                            </IconButton>
                                        </Box>
                                    </Stack>
                                )
                            })}
                        </AccordionDetails>
                        <AccordionActions>
                            <IconButton
                                onClick={() => setEditSeasonDialog({ seasonNumber: season.number, open: true, index })}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => setDeleteSeasonDialog({ open: true, number: season.number })}>
                                <Delete sx={{ color: "warning.main" }} />
                            </IconButton>
                            <IconButton onClick={() => setAddEpisode({ ...addEpisode, open: true, season: season })}>
                                <Add />
                            </IconButton>
                        </AccordionActions>
                    </Accordion>
                )
            })}

            <DeleteAlertDialog
                open={deleteSeasonDialog.open}
                onClose={() => setDeleteSeasonDialog({ ...deleteSeasonDialog, open: false })}
                title={`Do you want to delete Season ${deleteSeasonDialog.number}?`}
                description="If you delete this season all the episodes it contains will get be deleted!"
                onDelete={() => handleDeleteSeason(deleteSeasonDialog.number)}
                id={deleteSeasonDialog.number}
            />
            <EditSeasonDialog
                open={editSeasonDialog.open}
                onClose={() => setEditSeasonDialog({ ...editSeasonDialog, open: false })}
                seasonNumber={editSeasonDialog.seasonNumber}
                onSave={handleEditSeason}
                seasonIndex={editSeasonDialog.index}
            />
            <AddEpisodesDialog
                open={addEpisode.open}
                onClose={() => setAddEpisode({ ...addEpisode, open: false })}
                season={addEpisode.season}
                handleEpisodeSave={handleEpisodeSave}
            />
        </>
    )
}
