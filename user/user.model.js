const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        Profilepicture: String,
        name: String,
        email: { type: String },
        Phone: Number,
        password: String,
        bio: String

    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model("user", userSchema);