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
      SERVERNAME: body.SERVERNAME || "",
      CPU1: body.CPU1 || "",
      CPU2: body.CPU2 || "",
      MEMORYCONFIG: body.MEMORYCONFIG || "",
      MEMORYCAPACITY: body.MEMORYCAPACITY || "",
      M2DRIVES: body.M2DRIVES || "",
      BOOTDRIVES: body.BOOTDRIVES || "",
      TYPEOFDRIVE: body.TYPEOFDRIVE || "",
      NUMBEROFDRIVES: body.NUMBEROFDRIVES || "",
      STORAGEDRIVESIZE: body.STORAGEDRIVESIZE || "",
      RAIDREQUIRED: body.RAIDREQUIRED || "",
      EXTERNALHBA: body.EXTERNALHBA || "",
      NETWORK: body.NETWORK || "",
      GPU: body.GPU || "",
      NAME: body.NAME || "",
      EMAIL: body.EMAIL || "",
      COMPANY: body.COMPANY || "",
      NUMBER: body.NUMBER || "",
    };

    const emailMessage = {
      to: "simonb@weareplaster.com",
      from: "noreply@weareplaster.com",
      subject: "New Selecta Form Submission",
      template_id: "d-1344acf1237b43bbbb5cd62f2e0df646",
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
