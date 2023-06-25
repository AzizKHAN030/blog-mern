import PostModel from '../models/Post.js';
import UserModel from '../models/User.js';

export const createPost = async (req, res) => {
    try {
        const {
            body: {
                title,
                text,
                tags,
                imageUrl,
            },
            userId,
        } = req;

        const doc = new PostModel({
            title,
            text,
            tags,
            imageUrl,
            user: userId,
        });

        const post = await doc.save();

        return res.json(post);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        return res.json(posts);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const {
            params: {
                id,
            },
        } = req;

        const post = await PostModel
            .findOneAndUpdate(
                { _id: id },
                { $inc: { views: 1 } },
                { returnDocument: 'after' },
            )
            .populate('user')
            .populate('comments.user')
            .exec();

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.json(post);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const getTags = async (req, res) => {
    try {
        const postTags = await PostModel.find({}, 'tags').sort({ createdAt: -1 }).limit(5);

        const tags = postTags.map((post) => post.tags)
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index)
            .slice(0, 5);

        return res.json(tags);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const {
            params: {
                id,
            },
            userId,
        } = req;

        const post = await PostModel.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.user.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await post.deleteOne();

        return res.json({ success: true });
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const {
            params: {
                id,
            },
            body: {
                title,
                text,
                tags,
                imageUrl,
            },
            userId,
        } = req;

        const post = await PostModel.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.user.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        post.updateOne({
            title,
            text,
            tags,
            imageUrl,
        }).exec();

        return res.json({ success: true });
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const commentPostById = async (req, res) => {
    try {
        const {
            params: {
                id,
            },
            body: {
                comment,
            },
            userId,
        } = req;

        const post = await PostModel
            .findOneAndUpdate(
                { _id: id },
                { $inc: { commentsCount: 1 } },
                { returnDocument: 'after' },
            );
        const user = await UserModel.findById(userId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.comments.push({
            text: comment,
            user,
        });

        await post.save();

        return res.json({ success: true });
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const postComments = await PostModel
            .find({}, 'comments')
            .populate('comments.user')
            .sort({ createdAt: -1 })
            .limit(5);

        const comments = postComments.map((post) => post.comments)
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index)
            .slice(0, 5);

        return res.json(comments);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};
