import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Stack, InputLabel } from "@mui/material";
import { ISeason } from "../../utils/interfaces";
import { useEffect, useState } from "react"

interface EditSeasonDialogProps {
    seasonNumber: number;
    open: boolean;
    onClose: () => void;
    onSave: (newSeasonNumber: number, index: number) => void;
    seasonIndex: number;
}


export default function EditSeasonDialog({ seasonNumber, seasonIndex, onClose, open, onSave }: EditSeasonDialogProps) {
    const [newSeasonNumber, setNewSeasonNumber] = useState(-1)
    useEffect(() => {
        setNewSeasonNumber(seasonNumber)
    }, [seasonNumber])
    return (
        <>
            <Dialog maxWidth="md" fullWidth maxWidth="sm" open={open} onClose={onClose}>
                <DialogTitle>Edit Season</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Season Number"
                        sx={{ my: 2 }}
                        value={newSeasonNumber}
                        type="number"
                        onChange={(e) => { setNewSeasonNumber(Number(e.target.value)) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => { onSave(newSeasonNumber, seasonIndex); onClose() }}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}