export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Pegando os headers do rate limit para informar ao cliente
  const remaining = event.node.res.getHeader("x-ratelimit-remaining");
  const reset = event.node.res.getHeader("x-ratelimit-reset");

  return {
    message: "pong",
    timestamp: new Date().toISOString(),
    rateLimit: {
      remaining,
      resetIn: reset,
    },
  };
});
