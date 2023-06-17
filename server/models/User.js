import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    profilePic: String,
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);
