import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { IFile } from "../utils/interfaces";

interface Props {
    uploadProgress: number;
    onChangeHandler: (e: any) => Promise<void>;
    accepts: string;
    video?: IFile;
    id: string
}

export default function VideoUploader({ accepts, uploadProgress, onChangeHandler, video , id}: Props) {
    return (
        <Box>
            <Stack
                width={550}
                height={339}
                alignItems="center"
                justifyContent="center"
                border={1}
                my={2}
            >
                {video && video.fileName !== "" && video.extension !== "" &&
                    <video
                        src={`${process.env.API_ROUTE}/video/${video.fileName}.${video.extension}`}
                        className="bg-black"
                        controls
                    />
                }
                <label htmlFor={id}>{video?.extension == "" ? "Upload Video" : "Change Video"}</label>
                {/* @ts-ignore */}
                <input hidden id={id} type="file" accept={accepts} onChange={onChangeHandler} />
                {
                    uploadProgress > 0 && uploadProgress < 100 &&
                    <CircularProgress
                        sx={{ maxWidth: 24 }}
                        variant="determinate"
                        value={uploadProgress}
                    />
                }
            </Stack>
        </Box>
    )
}