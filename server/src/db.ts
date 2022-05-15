import mongoose from "mongoose"

export default async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/hotstar-clone")
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error)
    }
}