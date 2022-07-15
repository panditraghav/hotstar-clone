import { useState } from "react"
import AdminLayout from "../../components/Admin/AdminLayout"
import BtnPrimary from "../../components/Button/BtnPrimary"
import AddMovieDialog from "../../components/AddMovieDialog"
import { authFetcher } from "../../utils/fetcher"
import Sidebar from "../../components/Admin/Sidebar"
import useSWR from "swr"
import ShowsTable from "../../components/ShowsTable"

export default function Movies() {
    const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false)
    const { data: movies, error, mutate } = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/show/all/type=movie`
    }, authFetcher)

    function handleAddMovie() {
        setIsAddMovieDialogOpen(!isAddMovieDialogOpen)
    }

    function handleDialogClose() {
        setIsAddMovieDialogOpen(false)
        mutate()
    }

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
                {movies && movies.data && <ShowsTable shows={movies.data} />}
                {!movies && <span className="text-white">Loading ....</span>}

                <AddMovieDialog
                    onClose={handleDialogClose}
                    open={isAddMovieDialogOpen}
                />
            </div>
        </AdminLayout>
    )
}