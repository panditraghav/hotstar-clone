import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Stack, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { IShow } from "../utils/interfaces";
import FileInput from "./FileInput";

interface Props {
    open: boolean;
    onClose: () => void
}

export default function AddSeriesDialog({ open, onClose }: Props) {
    const [seriesData, setSeriesData] = useState<IShow>({
        type: "series",
        name: "",
        description: "",
    })
    const [cardImageUploadProgress, setCardImageUploadProgress] = useState(0)
    const [bannerImageUploadProgress, setBannerImageUploadProgress] = useState(0)

    function handleClose() {
        onClose()
    }

    async function handleCardImageUpload(e) {
    }

    async function handleBannerImageUpload() {

    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}