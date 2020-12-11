const session = require("express-session")
const express = require('express')

module.exports = {
    is_not_logged: () => {
        if (session.id === undefined || session.id === null) return true
        return false
        
    },
    user_exists: async (db, req) => {
        let bool = false
        let users = await db.collection('users').find().toArray()
        users.forEach(element => {
            if (element.name === req.body.username){
                bool = true
            }
        })
        return bool

    },
        
}