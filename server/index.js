const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud')


app.get('/', (req, res) =>
{
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) =>
{
    const id = req.params.id;
    UserModel.findById({ id })
        .then(users => res.json(users))
        .catch(err => res.json())
})

app.put('/updateUser/:id', async (req, res) =>
{
    try
    {
        const id = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser)
        {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (err)
    {
        res.status(500).json({ error: "Error updating user" });
    }
});


app.delete('/deleteUser/:id', (req, res) =>
{
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(deletedUser => 
        {
            if (!deletedUser)
            {
                return res.status(404).json({ error: "User not found" });
            }
            res.json({ message: "User deleted successfully", deletedUser });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


app.post("/createUser", (req, res) =>
{
    UserModel.create(req.body)
        .then(user => res.json({ message: "User created successfully", user }))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(3001, function ()
{
    console.log("SERVER IS RUNNING")
})