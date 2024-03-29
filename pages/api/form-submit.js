const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  // Get body content from request from frontend

  if (req.method === "POST") {
    const body = req.body;

    // Create object to send to EmailJs

    const emailData = {
      // ROOMNAME: body.ROOMNAME || "",
      NAME: body.NAME || "",
      EMAIL: body.EMAIL || "",
      COMPANY: body.COMPANY || "",
      NUMBER: body.NUMBER || "",
      ROOMNAME: body.ROOMNAME || "",
      AUDIOPREFERENCE: body.AUDIOPREFERENCE || "",
      DISPLAYOPTIONS: body.DISPLAYOPTIONS || "",
      WALLMOUNT: body.WALLMOUNT || "",
      ROOMSIZE: body.ROOMSIZE || "",
      ROOMBOOKINGS: body.ROOMBOOKINGS || "",
      FLEXCARE: body.FLEXCARE || "",
      XIOCLOUD: body.XIOCLOUD || "",
      ROOMLICENSE: body.ROOMLICENSE || "",
    };

    const emailMessage = {
      to: "sven.berckmoes@tdsynnex.com",
      from: "noreply@weareplaster.com",
      subject: "New Config Form Submission",
      template_id: "d-918cf9c532064ffbbf9cffa654cba1c1",
      dynamic_template_data: {
        ...emailData,
      },
    };

    // Send the email

    try {
      const sendEmail = await mail.send(emailMessage);

      const emailRes = sendEmail;

      if (emailRes[0].statusCode === 202 || emailRes[0].statusCode === 200) {
        console.log("email sent");
        res.status(200).json({ message: "Form sent", status: 200 });
      } else {
        throw new Error("Could not send email via Sendgrid");
      }
    } catch (error) {
      res.status(500).json({ message: "Error sending form" });
    }
  }
}
