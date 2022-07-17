import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Stack, InputLabel } from "@mui/material";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { ISeason } from "../../utils/interfaces";
import { useState } from "react"
import EditSeasonDialog from "./EditSeasonDialog";

interface SeasonsSectionProps {
    seasons: ISeason[],
    handleDeleteSeason: (id: number | string) => void
    handleEditSeason: (newSeasonNumber: number, index: number) => void
}

export default function SeasonsSection({ seasons, handleDeleteSeason, handleEditSeason }: SeasonsSectionProps) {
    const [deleteSeasonDialog, setDeleteSeasonDialog] = useState({ open: false, number: 0 })
    const [editSeasonDialog, setEditSeasonDialog] = useState<{
        open: boolean, seasonNumber: number, index: number
    }>({
        open: false, seasonNumber: - 1, index: -1
    })

    return (
        <>
            {seasons && seasons.map((season, index) => {
                return <Stack key={index} my={2} direction="row" justifyContent={"space-between"}>
                    <Stack direction="row" gap={2}>
                        <div>Season {season.number}</div>
                        <div>
                            <button onClick={() => setDeleteSeasonDialog({ open: true, number: season.number })}>
                                <Delete sx={{ color: "warning.main" }} />
                            </button>
                        </div>
                    </Stack>
                    <Stack direction="row" gap={2}>
                        <botton
                            onClick={() => setEditSeasonDialog({ seasonNumber: season.number, open: true, index })}
                        >
                            <Edit />
                        </botton>
                        <Add />
                    </Stack>
                </Stack>
            })}
            <DeleteAlertDialog
                open={deleteSeasonDialog.open}
                onClose={() => setDeleteSeasonDialog({ ...deleteSeasonDialog, open: false })}
                title={`Do you want to delete Season ${deleteSeasonDialog.number}?`}
                description="If you delete this season all the episodes it contains will get be deleted!"
                onDelete={handleDeleteSeason}
                id={deleteSeasonDialog.number}
            />
            <EditSeasonDialog
                open={editSeasonDialog.open}
                onClose={() => setEditSeasonDialog({ ...editSeasonDialog, open: false })}
                seasonNumber={editSeasonDialog.seasonNumber}
                onSave={handleEditSeason}
                seasonIndex={editSeasonDialog.index}
            />
        </>
    )
}
