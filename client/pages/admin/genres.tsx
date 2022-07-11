import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import AddGenreDialog from "../../components/AddGenreDialog"
import AdminLayout from "../../components/Admin/AdminLayout"
import Sidebar from "../../components/Admin/Sidebar"
import BtnPrimary from "../../components/Button/BtnPrimary"

function GenreList(props: { genres: IGenre[] }) {
    return (
        <ul className="px-8">
            {
                props.genres.map(genre => {
                    return <li
                        className=" list-disc"
                        key={genre._id}
                    >
                        {genre.name}
                    </li>
                })
            }

        </ul>
    )
}

interface IGenre {
    name: string;
    _id: string;
    __v: number;
}

export default function Genres() {
    const [isAddGenreDialogOpen, setIsAddGenreDialogOpen] = useState(false)
    const [genres, setGenres] = useState<IGenre[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        async function getGenres() {
            try {
                fetch(`${process.env.API_ROUTE}/genre`)
                    .then((res) => res.json())
                    .then(data => {
                        setGenres(data)
                        setIsFetching(false)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        getGenres()
        return () => {
        }
    }, [])


    function handleAddGenreClick() {
        setIsAddGenreDialogOpen(!isAddGenreDialogOpen)
    }

    function handleDialogClose() {
        setIsAddGenreDialogOpen(false)
    }


    return (
        <AdminLayout sidebar={<Sidebar selectedItem={"Genres"} />}>
            <div className="px-6">
                <div className=" py-8 text-gray-200 flex justify-between">
                    <h1 className="text-3xl underline">Genres</h1>
                    <BtnPrimary
                        onClick={handleAddGenreClick}
                    >
                        Add Genre
                    </BtnPrimary>
                </div>
                <div className="text-gray-200">
                    {isFetching ? <h1>Fetching data...</h1> : <GenreList genres={genres} />}
                </div>
                <AddGenreDialog
                    onClose={handleDialogClose}
                    open={isAddGenreDialogOpen}
                />
            </div>
        </AdminLayout>
    )
}
