import { useDB } from "~~/server/utils/useDB";

export default defineEventHandler(async (event) => {
  const db = useDB();

  const users = await db.query.users.findMany();
  return users;
});
