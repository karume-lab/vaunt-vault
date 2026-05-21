"use server";

import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
  from = "SharaHub <noreply@sharahub.local>",
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) => {
  try {
    const info = await nodemailer
      .createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: process.env.SMTP_USER
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
      })
      .sendMail({
        from,
        to,
        subject,
        html,
      });

    console.log(`Email sent to ${to}: ${info.messageId}`);
    if (process.env.NODE_ENV === "development") {
      console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
