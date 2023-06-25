import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        require: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    comments: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            text: String,
        }],
        default: [],
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model('Post', PostSchema);
