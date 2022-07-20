import { useState } from "react"
import AdminLayout from "../../components/Admin/AdminLayout"
import BtnPrimary from "../../components/Button/BtnPrimary"
import MovieDialog from "../../components/MovieDialog"
import { authFetcher } from "../../utils/fetcher"
import Sidebar from "../../components/Admin/Sidebar"
import useSWR from "swr"
import ShowsTable from "../../components/ShowsTable"
import EditMovieDialog from "../../components/EditMovieDialog"

export default function Movies() {
    const [movieDialog, setMovieDialog] = useState<{
        open: boolean;
        showId: string | null;
        edit: boolean
    }>({
        open: false,
        showId: null,
        edit: false
    })
    const { data: movies, error, mutate } = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/show/all/type=movie`
    }, authFetcher)

    function handleDialogClose() {
        setMovieDialog({ open: false, edit: false, showId: null })
        mutate()
    }

    function handleOnEdit(showId: string) {
        setMovieDialog({ open: true, showId: showId , edit: true})
    }

    return (
        <AdminLayout sidebar={<Sidebar selectedItem={"Movies"} />}>
            <div className="px-6">
                <div className=" py-8 text-gray-200 flex justify-between">
                    <h1 className="text-3xl underline">Movies</h1>
                    <BtnPrimary
                        onClick={() => setMovieDialog({ open: true, showId: null, edit: false })}
                    >
                        Add Movies
                    </BtnPrimary>
                </div>
                {movies && movies.data && <ShowsTable
                    shows={movies.data}
                    onEdit={handleOnEdit}
                />}
                {!movies && <span className="text-white">Loading ....</span>}

                <MovieDialog
                    onClose={handleDialogClose}
                    open={movieDialog.open}
                    edit={movieDialog.edit}
                    showId={movieDialog.showId}
                />
            </div>
        </AdminLayout>
    )
}