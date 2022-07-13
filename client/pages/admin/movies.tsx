import Sidebar from "../../components/Admin/Sidebar"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/Admin/AdminLayout"
import BtnPrimary from "../../components/Button/BtnPrimary"
import AddMovieDialog from "../../components/AddMovieDialog"
import { authFetcher } from "../../utils/fetcher"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Edit, MovieCreation } from "@mui/icons-material"

interface IMovie {
    _id: string;
    name: string;
    genres: { name: string }[];
    description: string;
}



export default function Movies() {
    const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false)
    const [movies, setMovies] = useState<IMovie[]>([])
    const [isLoaded, setIsLoaded] = useState(true)

    function handleAddMovie() {
        setIsAddMovieDialogOpen(!isAddMovieDialogOpen)
    }

    function handleDialogClose() {
        setIsAddMovieDialogOpen(false)
    }

    useEffect(() => {
        async function fetchMovies() {
            try {
                const res = await authFetcher({
                    method: "get",
                    url: `${process.env.API_ROUTE}/show/all/type=movie`
                })
                console.log(res.data)
                setMovies(res.data)
                setIsLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [])

    return (
        <AdminLayout sidebar={<Sidebar selectedItem={"Movies"} />}>
            <div className="px-6">
                <div className=" py-8 text-gray-200 flex justify-between">
                    <h1 className="text-3xl underline">Movies</h1>
                    <BtnPrimary
                        onClick={handleAddMovie}
                    >
                        Add Movies
                    </BtnPrimary>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Genre</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies.length > 0 && movies.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.genres.map(genre => genre.name).join(",")}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right"><Edit /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!isLoaded && <span className="tex-white">Loading ....</span>}

                <AddMovieDialog
                    onClose={handleDialogClose}
                    open={isAddMovieDialogOpen}
                />
            </div>
        </AdminLayout>
    )
}