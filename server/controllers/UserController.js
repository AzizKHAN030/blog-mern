import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const {
            body: {
                email,
                password,
                fullName,
                profilePic,
            },
        } = req;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            email,
            passwordHash,
            fullName,
            profilePic,
        });
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secret', { expiresIn: '24h' });
        const { passwordHash: passwordHashFromDb, ...userData } = user._doc;

        return res.json({ ...userData, token });
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const login = async (req, res) => {
    try {
        const {
            body: {
                email,
                password,
            },
        } = req;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user._doc.passwordHash);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password or email',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret', { expiresIn: '24h' });

        const { passwordHash, ...userData } = user._doc;

        return res.json({ ...userData, token });
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { passwordHash, ...userData } = user._doc;

        return res.json(userData);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};
