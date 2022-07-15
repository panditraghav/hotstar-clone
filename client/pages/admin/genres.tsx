import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import useSWR from "swr"
import AddGenreDialog from "../../components/AddGenreDialog"
import AdminLayout from "../../components/Admin/AdminLayout"
import Sidebar from "../../components/Admin/Sidebar"
import BtnPrimary from "../../components/Button/BtnPrimary"
import { authFetcher } from "../../utils/fetcher"

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
    const { data: genres, error: genresError, mutate } = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/genre`
    }, authFetcher)

    function handleAddGenreClick() {
        setIsAddGenreDialogOpen(!isAddGenreDialogOpen)
    }

    function handleDialogClose() {
        setIsAddGenreDialogOpen(false)
        mutate()
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
                    {genres && genres.data ? <GenreList genres={genres.data} /> : <h1>Fetching data...</h1>}
                </div>
                <AddGenreDialog
                    onClose={handleDialogClose}
                    open={isAddGenreDialogOpen}
                />
            </div>
        </AdminLayout>
    )
}
