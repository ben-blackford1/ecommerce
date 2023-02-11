import nc from "next-connect";
import database from "@/utils/database";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import { createActivationToken } from "@/utils/tokens";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmails";
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await database.connectToDatabase();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exists." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const createdUser = await newUser.save();
    const activation_token = createActivationToken({
      id: createdUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your account", activateEmailTemplate);
    await database.disconnectFromDatabase();
    res.json({
      message:
        "You are now registered. You have now been sent an email to activate your account. Please do this to start shopping.",
    });
    res.send(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
