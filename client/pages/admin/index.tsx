import AdminLayout from "../../components/Admin/AdminLayout";
import Sidebar from "../../components/Admin/Sidebar"

export default function Admin() {
    return (
        <div className="">
            <AdminLayout sidebar={<Sidebar selectedItem={"All Content"}/>}>
                <div className="px-6 py-8 text-gray-200">
                    <h1 className="text-3xl underline">All Content</h1>
                </div>
            </AdminLayout>
        </div>
    )
}
