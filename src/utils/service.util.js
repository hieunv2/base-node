const getQueryOptions = query => {
  const page = query.page_index * 1 || 1;
  const limit = query.page_size * 1 || 20;
  const skip = (page - 1) * limit;

  const sort = {};
  if (query.sortBy) {
    const parts = query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  return { limit, skip, sort };
};

const getQueryFilter = query => {
  let filter = {}
  if(query.category){
    filter.category = query.category;
  }
  if(query.tag){
    filter.tag = new RegExp(query.tag,"i")
  }
  if(query.name){
    filter.name = new RegExp(query.name,"i")
  }
  return filter
};

module.exports = {
  getQueryOptions,
  getQueryFilter
};
