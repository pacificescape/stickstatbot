const User = require('../db/models/user/user_model.js')



exports.newUser = (chat) => new Promise(async (resolve, reject) => {
    try {
        if (!chat) {
            resolve({
                success: false,
                message: 'user is required'
            })
        }
        let {id, first_name, username} = chat

        const newUser = new User({
            id,
            first_name,
            username
        })

        const user = await newUser.save()
        
       

        resolve({
            success: true,
            data: user
        })
    } catch (error) {
        reject()
    }
})

exports.checkUser = (id) => new Promise(async (resolve, reject) => {
    try {
        let user = await User.find({id})
        if(user.length) resolve({success: true})
        resolve({success: false})
    } catch (error) {
        reject({success: false})
    }
})