import { CallbackWithoutResultAndOptionalError, Document, ObjectId, Schema, model } from "mongoose";

export interface VerificationCodeInterface {

    userId: ObjectId

    code: number

    expiresAt: Date
}

export interface VerificationCodeModel extends VerificationCodeInterface, Document {
    userId: ObjectId

    code: number

    expiresAt: Date
}

const VerificationCodeModelSchema: Schema = new Schema<VerificationCodeModel>({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    code: {
        type: "Number",
        required: true,
    },
    expiresAt: {
        type: "Date",
        required: true,
        default: new Date(Date.now() + (3 * 60 * 1000))
    }

},
    {
        timestamps: true,
        minimize: false,
    }
)

VerificationCodeModelSchema.pre("save", async function (this: VerificationCodeModel, next: CallbackWithoutResultAndOptionalError) {

    if (!this.expiresAt)
        this.expiresAt = new Date(Date.now() + (3 * 60 * 1000))

})

const VerificationCode = model<VerificationCodeModel>("VerificationCode", VerificationCodeModelSchema)

export default VerificationCode