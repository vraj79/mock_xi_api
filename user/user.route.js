const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRouter = express.Router();
const User = require("./user.model");
const SCECRET_KEY = "12345";

UserRouter.post("/register", async (req, res) => {
    const { name, email, password, Profilepicture, Phone, bio } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send({
                status: 0,
                message: "User already Exists",
            });
        } else {
            let pass = await bcrypt.hashSync(password, 10);
            let user = await User.create({
                ...req.body,
                password: pass,
            });
            return res
                .status(201)
                .send({ user, message: "User created Successfully" });
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});


UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            let pass = await bcrypt.compare(password, user.password);
            if (!pass) {
                return res.send("incorrect password");
            } else {
                let token = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                    },
                    SCECRET_KEY
                );
                return res.send({ token, user, message: "Login Successfully" });
            }
        } else {
            return res.send("Your not registered");
        }
    } catch (error) {
        return res.send(error.message);
    }
});

UserRouter.get("/get/:id", async (req, res) => {
    const {id}=req.params
    const user = await User.findById(id)
    if (user) {
        return res.status(200).send(user);
    } else {
        return res.status(404).send('User not found');
    }
})

UserRouter.patch("/edit/:id", async (req, res) => {
    const {id}=req.params
    try {
        const user = await User.findByIdAndUpdate({ _id: id }, req.body);
        if (user) {
            return res.status(200).send(`Updated user profile`);
        } else {
            return res.status(404).send(`User profile not found`);
        }
    } catch (error) {
        return res.status(404).send("Unable to edit profile data");
    }
})


module.exports = UserRouter;