const User = require('../model/userModel');
const bcrypt = require('bcryptjs')
const { createAccessToken } = require ('../util/token')

const authController = {
    register: async(req,res) => {
        try {
            let { name, email, mobile, password } = req.body
             
            //encrypt the password
            let passHash = await bcrypt.hash(password,10); // it is use to decrypt the data 10 rounds of bits

            await User.create({  //wait for the async to received the data
                name,
                email,
                mobile, 
                password: passHash 
                })
            
            res.json({ msg : "User registered successfully" }) 
        } catch (error) {
          return res.status(500).json ({ msg: error.message})
        }
    },
    login: async (req,res) => {
        try {
            let { email, password } = req.body;
             
            //user exist or not
            const extUser = await User.findOne({ email }) // it will check the email whether it is exist or not
            if(!extUser)
             return res.status(400).json({ msg:"user doesn't exist"})
            
             // password match
             const isMatch = await bcrypt.compare(password, extUser.password) // both existance data and decrypted data compare
             if (!isMatch)
              return res.status(400).json({msg: "Incorrect Password"})
             
              // generate the token
              const accessToken = createAccessToken({ id: extUser._id}) // it will compare existance data match with current data

              res.cookie('loginToken', accessToken, {
                httpOnly:true,
                signed: true,
                maxAge: 1 * 24 * 60 * 60 * 1000 // it tell duration of login
              })
              res.json({
                user: {
                    id:extUser._id,
                    role:extUser.role
                }, token: accessToken})
        } catch (error) {
            return res.status(500).json ({ msg: err.message }) 
        }
    },
    logout: async (req,res) => {
        try {
             res.clearCookie('loginToken', null, {
                expires: new Date(Date.now()),
                httpOnly:true
             })

            res.json({ msg:"logout successfully"})
        } catch (error) {
            return res.status(500).json ({ msg: error.message}) 
        }
    }
}

module.exports = authController