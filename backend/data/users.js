const bcrypt = require("bcryptjs");
const Users =[
    {
        name: "admin1",
        email: "admin@a.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin: true
    },
    {
        name: "user1",
        email: "user1@a.com",
        password: bcrypt.hashSync("123456",10),
    },
    {
        name: "user2",
        email: "user2@a.com",
        password: bcrypt.hashSync("123456",10),
    }
]

module.exports = Users;