import { Done } from "@mui/icons-material";
import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { MutableRefObject } from "react"

interface Props {
    uploadProgress: number;
    onChangeHandler: () => void;
    label: string;
    accepts: string
}

export default function FileInput({ accepts, uploadProgress, onChangeHandler, label }: Props) {
    const id = label.split(" ").join("")
    return (
        <Stack direction="row" my={2} justifyContent={"space-between"}>
            <label htmlFor={id}>{label}</label>
            {/* @ts-ignore */}
            <input id={id} type="file" accept={accepts} onChange={onChangeHandler} />
            <Box width="20%">
                {
                    uploadProgress > 0 && uploadProgress < 100 &&
                    <CircularProgress
                        sx={{ maxWidth: 24 }}
                        variant="determinate"
                        value={uploadProgress}
                    />
                }
                {uploadProgress === 100 && <Done color="success" />}
            </Box>
        </Stack >
    )
}