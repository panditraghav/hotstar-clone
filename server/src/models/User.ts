import mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import validator from "validator"

export interface IUser {
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: [true, "Please enter a email"],
        lowerCase: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Minimum password length is 6 characters!"]
    },
})

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})

export default mongoose.model<IUser>("User", userSchema)