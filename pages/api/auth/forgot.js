import nc from "next-connect";
import database from "@/utils/database";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import { createResetToken } from "@/utils/tokens";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await database.connectToDatabase();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your password", resetEmailTemplate);
    await database.disconnectFromDatabase();
    res.json({
      message:
        "An email has been sent to you. Use this to reset your password.",
    });
    res.send(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
