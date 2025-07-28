function requestFunc(api, apiName) {
  return async function onRequest(props) {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    const filter = props.filter;
    loading.value = true;

    const fetchCount =
      rowsPerPage == 0 ? pagination.value.rowsNumber : rowsPerPage;
    const startRow = (page - 1) * rowsPerPage;
    const defaultParam = {
      limit: fetchCount,
      offset: startRow,
      order_by: pagination.value.sortBy,
      order_by_type: descending ? "desc" : "asc",
    };
    const param = Object.assign({}, defaultParam, filter);
    const response = await api.call({
      param: param,
      apiName: apiName,
      loading: false,
      showErrorNotification: false,
    });
    if (response.success) {
      pagination.value.rowsNumber = response.data.total_rows;
      rows.value.splice(0, rows.value.length, ...response.data.datalist);
    }

    loading.value = false;

    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  };
}

export default requestFunc;
