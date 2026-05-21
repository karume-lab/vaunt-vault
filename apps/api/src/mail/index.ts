import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL Port 465
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendResellingGuide = async (to: string) => {
  return transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to,
    subject: "Your Digital Reselling Guide",
    html: "<p>Thank you for your purchase! Click here to download your secure guide.</p>",
  });
};

export const sendInvoiceConfirmation = async (to: string) => {
  return transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to,
    subject: "Invoice Confirmation",
    html: "<p>Your checkout is complete. Here is your invoice.</p>",
  });
};

export const sendAbandonedCartRecovery = async (to: string) => {
  return transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to,
    subject: "You left something behind!",
    html: "<p>Looks like you forgot to checkout. Come back to complete your order!</p>",
  });
};
