import { rest } from "msw";

export const handlers = [
  rest.get("/api/test-data", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Success",
        data: { id: 1, name: "Test Item" },
      })
    );
  }),
];
