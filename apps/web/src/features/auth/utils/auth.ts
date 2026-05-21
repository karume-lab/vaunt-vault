import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { db } from "@/features/shared-db/client";
import {
  account,
  session,
  user,
  verification,
} from "@/features/shared-db/schema";
import { sendEmail } from "@/lib/utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),

  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
      },
      phoneNumberVerified: {
        type: "boolean",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async () => {
          throw new APIError("FORBIDDEN", {
            message:
              "Sign up is disabled. Credentials must be created manually.",
          });
        },
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 600,
    sendVerificationEmail: async ({ user, token }) => {
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}&email=${encodeURIComponent(user.email)}`;
      await sendEmail({
        to: user.email,
        subject: "Verify your email | SharaHub",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to SharaHub!</h2>
            <p>Thanks for signing up. Please verify your email by clicking the link below:</p>
            <a 
              href="${url}" 
              style="display: inline-block; padding: 12px 24px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;"
            >
              Verify Email Address
            </a>
            <p>This link will expire in 10 minutes.</p>
            <p>If you did not sign up for SharaHub, you can safely ignore this email.</p>
          </div>
        `,
      });
    },
  },

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, token }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `
          <p>You requested a password reset.</p>
          <p>Click below to reset your password:</p>
          <a 
            href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}" 
            style="color: #1a73e8; text-decoration: none; font-weight: bold;"
          >
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  plugins: [
    admin(),
    nextCookies(),

    emailOTP({
      expiresIn: 600,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // Used by the phone verification flow (PhoneVerificationBanner / VerifyPhoneContent).
          // Sign-up email verification is handled separately via emailVerification.sendVerificationEmail.
          const targetUsers = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);
          const targetUser = targetUsers[0];
          const phoneParam = targetUser?.phoneNumber
            ? `&phone=${encodeURIComponent(targetUser.phoneNumber)}`
            : "";
          const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-phone?token=${otp}${phoneParam}`;
          await sendEmail({
            to: email,
            subject: "Verify your phone number | SharaHub",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Phone Number Verification</h2>
                <p>You requested to verify your phone number on SharaHub.</p>
                <p>Please verify your phone number by clicking the link below:</p>
                <a 
                  href="${url}" 
                  style="display: inline-block; padding: 12px 24px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;"
                >
                  Verify Phone Number
                </a>
                <p>This link will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
              </div>
            `,
          });
        } else if (type === "forget-password") {
          await sendEmail({
            to: email,
            subject: "Reset your password",
            html: `<p>Your password reset code is <b>${otp}</b>.</p>`,
          });
        }
      },
    }),
  ],
});
