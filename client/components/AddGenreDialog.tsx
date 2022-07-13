import { useState } from "react"
import { Dialog, DialogActions, DialogContent, TextField, Button, DialogTitle, Stack, Alert } from "@mui/material"
import { authFetcher } from "../utils/fetcher"

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function AddGenreDialog({ open, onClose }: Props) {
    const [newGenre, setNewGenre] = useState("")
    const [error, setError] = useState<null | string>(null)

    async function handleSave() {
        try {
            const res = await authFetcher({
                method: "post",
                url: `${process.env.API_ROUTE}/genre/`,
                data: { name: newGenre }
            })
            if (res.data.code && res.data.code == 11000) {
                setError("Duplicate values not allowed")
            }
            else {
                setError(null)
            }
        } catch (error) {
            setError("Some error occured")
            console.log(error)
        }
        if (error === null) {
            onClose()
            location.reload()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Add Genre</DialogTitle>
            <DialogContent>
                <Stack>
                    <TextField
                        id=""
                        label="Genre"
                        value={newGenre}
                        onChange={(e) => { setNewGenre(e.target.value) }}
                    />
                </Stack>
                {error && <Alert severity="error">{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancle</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}