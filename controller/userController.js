const User = require('../model/userModel')

const userController = {
    getAllUser: async (req,res) => {
        try {
            let users = await User.find().select('-password');
              //filter only user
            let nonAdminData = users.filter((item) => item.role === "user");

            res.status(200).json({ users: nonAdminData })
        } catch (error) {
            return res.status(500).json ({ msg: error.message}) 
        }
    },
    getSingleUser: async (req,res) => {
        try {
            let user = await User.findById({ _id:req.params.id });
            res.json({ user })
        } catch (error) {
            return res.status(500).json ({ msg: error.message})  
        }
    },
    getCurrentUser: async (req,res) => {
        try {
            let id =req.user.id;

            let user =  await User.findById({_id:id })

            res.json({ user })
        } catch (error) {
            return res.status(500).json ({ msg: error.message}) 
        }
    },
    updateUser: async (req,res) => {
        try {
            let id = req.params.id

            const { name, email, mobile } = req.body

            await User.findByIdAndUpdate({_id: id}, { name, email, mobile })
                
            res.json({ msg : "User updated successfully" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteUser: async (req,res)=> {
        try {
            let id = req.params.id//_id it will come from front end and 

            await User.findByIdAndDelete({_id: id})  
                
            res.json({ msg : "User deleted successfully" }) // it will find the  id it will delete
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = userController