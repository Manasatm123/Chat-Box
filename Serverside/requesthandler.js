import express from "express";
import userSchema from "./models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import nodemailer from "nodemailer";
// import ChatBox from "./models/ChatBox.js";
// import chatListSchema from './models/ChatList.js';
const app = express();

export async function register(req, res) {
  const { username, phone, pwd, cpwd, image, email } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    if (!(username && email && pwd && cpwd))
      return res.status(500).send({ msg: "fields are empty" });
    if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" });
    bcrypt
      .hash(pwd, 10)
      .then((hpwd) => {
        userSchema.create({
          username,
          email,
          phone,
          pass: hpwd,
          image,
          about: null,
        });
        res.status(200).send({ msg: "Successfull" });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(500).send({ msg: "email already used " });
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manasaworkmail123@gmail.com",
    pass: "iaxf vrye fxtr xhqw",
  },
});

export async function verifyEmail(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(500).send({ msg: "Fields are empty" });
  }

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      const info = await transporter.sendMail({
        from: "no-reply@chatbox.com",
        to: email,
        subject: "Welcome to Chat-Box! Confirm Your Account",
        text: "Please confirm your account",
        html: `
                    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #1E1E1E; padding: 40px;">
    <div style="background-color: #222; border-radius: 8px; padding: 30px; max-width: 500px; margin: auto; box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);">
        <h1 style="color: #00B4AA;">Welcome to Chat-Box!</h1>
        <p style="font-size: 16px; color: #ddd;">Hello,</p>
        <p style="font-size: 16px; color: #bbb;">Click confirm account to continue your registration </p>
        <a href="http://localhost:5173/register" 
           style="display: inline-block; padding: 12px 25px; color: #fff; background: linear-gradient(45deg, #FF6A00, #FF007A); text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 20px;">
           Confirm Account
        </a>
        <p style="font-size: 14px; color: #888; margin-top: 20px;">If you did not create this account, please ignore this email.</p>
        <p style="font-size: 14px; color: #888; margin-top: 10px;">Need help? Contact us at support@chatbox.com.</p>
    </div>
</div>

                `,
      });
      console.log("Message sent: %s", info.messageId);
      res.status(200).send({ msg: "Confirmation email sent" });
    } else {
      return res.status(500).send({ msg: "Email already exists" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ msg: "Error sending email" });
  }
}

export async function login(req, res) {
  // console.log(req.body);
  const { email, pass } = req.body;
  if (!(email && pass))
    return res.status(500).send({ msg: "fields are empty" });
  const user = await userSchema.findOne({ email });
  if (!user) return res.status(500).send({ msg: "email donot exist" });
  const success = await bcrypt.compare(pass, user.pass);
  // console.log(success);
  if (success !== true)
    return res.status(500).send({ msg: "email or password not exist" });
  const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  // console.log(token);
  res.status(200).send({ token });
}
