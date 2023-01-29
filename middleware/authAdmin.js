const User = require('../model/userModel')

const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findById({_id: req.user.id})

        if(user.role !== "superadmin")
          return res.status(400).json({ msg:"Access denied for users.."});

          next()
    } catch (error) {
        return res.status(500).json({ msg: error.message})
    }
}
module.exports = authAdmin;