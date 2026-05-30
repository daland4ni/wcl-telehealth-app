const User = require('../models/User');

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

module.exports = {
    updateProfile,
};