import Sidebar from "../../components/Admin/Sidebar"
import AdminLayout from "../../components/Admin/AdminLayout"

export default function Movies() {
    return (
        <AdminLayout sidebar={<Sidebar selectedItem={"Movies"} />}>
            <div className="px-6 py-8 text-gray-200">
                <h1 className="text-3xl underline">Movies</h1>
            </div>
        </AdminLayout>
    )
}