const User = require('../models/User');
const mongoose = require('mongoose');

const updateProfile = async (req, res) => {
    try {
        const { name, bio } = req.body;

        const updatedData = {
            name,
            bio,
        };

        if (req.file) {
            console.log(Object.keys(req.file));
            updatedData.profilePicture =
                req.file.path;
        }

        const user =
            await User.findByIdAndUpdate(
                req.params.id,
                updatedData,
                { new: true }
            );

        res.json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Failed to update profile',
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error('Get user by ID error:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};
module.exports = {
    updateProfile,
    getUserById,
};