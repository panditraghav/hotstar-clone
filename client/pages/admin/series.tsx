import { useState } from "react"
import useSWR from "swr"
import AddSeriesDialog from "../../components/AddSeriesDialog"
import AdminLayout from "../../components/Admin/AdminLayout"
import Sidebar from "../../components/Admin/Sidebar"
import BtnPrimary from "../../components/Button/BtnPrimary"
import ShowsTable from "../../components/ShowsTable"
import { authFetcher } from "../../utils/fetcher"

export default function Series() {
    const [addSeriesDialogOpen, setAddSeriesDialogOpen] = useState(false)
    const { data: series, error: seriesError , mutate} = useSWR({
        method: "get",
        url: `${process.env.API_ROUTE}/show/all/type=series`
    }, authFetcher)

    function handleAddSeriesDialogOpen() {
        setAddSeriesDialogOpen(true)
    }

    function handleAddSeriesDialogClose() {
        setAddSeriesDialogOpen(false)
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
                {series && series.data && <ShowsTable shows={series.data} />}
                {!series && <span className="text-white">Loading ....</span>}

                <AddSeriesDialog
                    onClose={handleAddSeriesDialogClose}
                    open={addSeriesDialogOpen}
                />
            </div>
        </AdminLayout>
    )
}