import { useState } from "react"
import useSWR from "swr"
import SeriesDialog from "../../components/SeriesDialog"
import AdminLayout from "../../components/Admin/AdminLayout"
import Sidebar from "../../components/Admin/Sidebar"
import BtnPrimary from "../../components/Button/BtnPrimary"
import ShowsTable from "../../components/ShowsTable"
import { authFetcher } from "../../utils/fetcher"

export default function Series() {
    const [seriesDialog, setSeriesDialog] = useState<{
        open: boolean;
        showId: string | null;
        edit: boolean;
    }>({ open: false, showId: null, edit: false })
    const [editSeries, setEditSeries] = useState<{
        open: boolean,
        showId: null
    }>({ open: false, showId: null })
    const { data: series, error: seriesError, mutate } = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/show/all/type=series`
    }, authFetcher)

    function handleAddSeriesDialogOpen() {
        setSeriesDialog({ open: true, edit: false, showId: null })
    }

    function handleAddSeriesDialogClose() {
        setSeriesDialog({ open: false, edit: false, showId: null })
        mutate()
    }

    function handleEditSeries(showId: string) {
        console.log(showId)
        setSeriesDialog({ showId: showId, open: true, edit: true })
    }

    return (
        <AdminLayout sidebar={<Sidebar selectedItem={"Series"} />}>
            <div className="px-6">
                <div className=" py-8 text-gray-200 flex justify-between">
                    <h1 className="text-3xl underline">Series</h1>
                    <BtnPrimary
                        onClick={handleAddSeriesDialogOpen}
                    >
                        Add Series
                    </BtnPrimary>
                </div>
                {series && series.data && <ShowsTable onEdit={handleEditSeries} shows={series.data} />}
                {!series && <span className="text-white">Loading ....</span>}

                <SeriesDialog
                    onClose={handleAddSeriesDialogClose}
                    open={seriesDialog.open}
                    edit={seriesDialog.edit}
                    showId={seriesDialog.showId}
                />
            </div>
        </AdminLayout>
    )
}