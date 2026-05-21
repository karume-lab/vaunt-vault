import { os } from "@orpc/server";
import { contactRouter } from "@/features/contact/server";

export const router = os.router({
  contact: contactRouter,
});

export type Router = typeof router;
