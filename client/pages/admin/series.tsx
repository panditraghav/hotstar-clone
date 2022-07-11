import AdminLayout from "../../components/Admin/AdminLayout"
import Sidebar from "../../components/Admin/Sidebar"

export default function Series() {
    return (
        <AdminLayout sidebar={<Sidebar selectedItem={"Series"} />}>
            <div className="px-6 py-8 text-gray-200">
                <h1 className="text-3xl underline">Series</h1>
            </div>
        </AdminLayout>
    )
}