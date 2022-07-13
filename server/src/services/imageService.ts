const dir = process.cwd() + "/images"

export function getImagePath(fileName: string, extension: string) {
    return `${dir}/${fileName}.${extension}`
}