const dir = process.cwd() + "/videos"

export function getVideoPath(fileName: string, extension: string) {
    return `${dir}/${fileName}.${extension}`
}