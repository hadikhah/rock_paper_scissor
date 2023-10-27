import mongoose, { CallbackWithoutResultAndOptionalError, Schema } from "mongoose"
import { genSalt, hash } from "bcryptjs"

interface UserInterface {

    name?: string

    email: string

    password: string

    avatar?: string

    emailVerifiedAt?: Date,

}

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, "email field is required"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email should be valid",
        ],
    },
    password: {
        type: String,
        required: [true, "password field is required"],
    },
    avatar: {
        type: String,
        required: false
    },
    emailVerifiedAt: {
        type: Date,
        required: false
    }
}
    ,
    {
        timestamps: true,
        minimize: false,
    }
)

// Encrypt password befor saveing to DB
userSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {

    if (!this.isModified("password"))

        return next()

    const salt = await genSalt(10)
    const hashPassword = await hash(this.password, salt)

    this.password = hashPassword

    next()

})

const User = mongoose.model("User", userSchema)

export default User