import { Done } from "@mui/icons-material";
import { CircularProgress, Stack } from "@mui/material";
import { MutableRefObject } from "react"

interface Props {
    uploadProgress: number;
    onChangeHandler: () => void;
    inputRef: MutableRefObject<HTMLInputElement | undefined>;
    label: string;
    accepts: string
}

export default function FileInput({ accepts, inputRef, uploadProgress, onChangeHandler, label }: Props) {
    const id = label.split(" ").join("")
    return (
        <Stack direction="row" my={2} justifyContent={"space-between"}>
            <label htmlFor={id}>{label}</label>
            {/* @ts-ignore */}
            <input id={id} ref={inputRef} type="file" accept={accepts} onChange={onChangeHandler} />
            {
                uploadProgress > 0 && uploadProgress < 100 &&
                <CircularProgress
                    sx={{ maxWidth: 24 }}
                    variant="determinate"
                    value={uploadProgress}
                />
            }
            {uploadProgress === 100 && <Done color="success" />}
        </Stack >
    )
}