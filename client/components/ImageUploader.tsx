import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { IFile } from "../utils/interfaces";

interface Props {
    uploadProgress: number;
    onChangeHandler: (e: any) => Promise<void>;
    image?: IFile;
    id: string
    type: "horizontal" | "vertical"
}

export default function ImageUploader({ uploadProgress, onChangeHandler, image: image, id, type }: Props) {
    return (
        <Box>
            <Stack
                sx={{ width: (type == "vertical" ? 138 : "100%"), height: 190 }}
                border={1}
                my={2}
            >
                {image && image.fileName !== "" && image.extension !== "" &&
                    <img
                        src={`${process.env.API_ROUTE}/image/${image.fileName}.${image.extension}`}
                        width={138}
                        height={186}
                    />
                }
                <label htmlFor={id}>{image?.extension == "" ? "Upload Image" : "Change Image"}</label>
                {/* @ts-ignore */}
                <input hidden id={id} type="file" accept={"image/png, image/jpeg"} onChange={onChangeHandler} />
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