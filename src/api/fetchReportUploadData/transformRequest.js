export default ({ pageIndex, pageSize, startDate, endDate, organizationId, isDescending }) => {
  return {
    pagingIndex: 0, // 目前沒做分頁所以直接給 0
    pagingSize: 0, // 目前沒做分頁所以直接給 0
    startDate,
    endDate,
    orgId: organizationId === 'all' ? null : organizationId, // 如果選全單位，就不對單位進行篩選
    descending: isDescending,
  }
}
