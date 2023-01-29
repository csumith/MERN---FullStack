const route = require('express').Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

route.get(`/allUser`,auth,userController.getAllUser)
route.get(`/single/:id`,auth,userController.getSingleUser)
route.get(`/show`,auth,userController.getCurrentUser)

route.patch(`/edit/:id`, auth, userController.updateUser)
route.delete('/delete/:id', auth, userController.deleteUser)


module.exports = route