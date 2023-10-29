import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
  create: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input: { email } }) => {
      await ctx.db.insert(users).values([
        {
          id: Date.now().toString(),
          name: email.split("@").at(0),
          email,
        },
      ]);
    }),
});
