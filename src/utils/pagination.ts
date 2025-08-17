// src/utils/pagination.ts
export const getPagination = (page = 1, limit = 10) => {
  const take = Number(limit);
  const skip = (Number(page) - 1) * take;
  return { skip, take };
};
