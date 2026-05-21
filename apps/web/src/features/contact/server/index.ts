import { os } from "@orpc/server";
import { z } from "zod";
import { sendEmail } from "@/lib/utils";

const sendEmailProcedure = os
  .input(
    z.object({
      to: z.email(),
      subject: z.string(),
      html: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const result = await sendEmail(input);
    return result;
  });

export const contactRouter = os.router({
  sendEmail: sendEmailProcedure,
});
