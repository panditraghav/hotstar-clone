import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { IShow } from "../utils/interfaces"

interface Props {
    shows: IShow[];
    onEdit: (showId: string) => void;
    onDelete: (showId: string, showName: string) => (void | Promise<void>);
}

export default function ShowsTable({ shows, onEdit, onDelete }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Genre</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shows.length > 0 && shows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.genres.map(genre => genre.name).join(",")}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => onEdit(row._id)}>
                                    <Edit />
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => onDelete(row._id, row.name)}>
                                    <Delete sx={{ color: "warning.main" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}