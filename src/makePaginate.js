const makePaginate = (req) => {
  const {
    query: { limit: rawLimit = 5, page: rawPage = 1, orderBy, order },
  } = req;

  if (order && !["desc", "asc"].includes(order.toLowerCase())) {
    throw new Error("wrong order argument.");
  }

  const page = Number(rawPage - 1);
  const limit = rawLimit > 10 ? 10 : Number(rawLimit);
  const offset = limit * page;

  return (query) => {
    if (orderBy) {
      query.orderBy(orderBy, order);
    }

    return query.limit(limit).offset(offset);
  };
};

module.exports = makePaginate;
