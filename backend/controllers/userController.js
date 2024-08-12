
export const getUserProfile = async (req, res) => {
    try {
        // Return user data
        res.status(200).json({message:req.user});
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user data', error: err.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { f_name, m_name, l_name, address } = req.body;
        const user = await User.findByPk(req.user.uid);
        if (user) {
            user.f_name = f_name;
            user.m_name = m_name;
            user.l_name = l_name;
            user.address = address;
            await user.save();
            res.status(200).json({ message: 'Profile updated successfully', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
};