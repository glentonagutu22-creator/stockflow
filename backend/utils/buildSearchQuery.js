const buildSearchQuery = (
  search = "",
  fields = [],
  filters = {}
) => {
  const query = { ...filters };

  if (search && fields.length > 0) {
    query.$or = fields.map((field) => ({
      [field]: {
        $regex: search,
        $options: "i",
      },
    }));
  }

  return query;
};

export default buildSearchQuery;