export default ({ pagingIndex, pagingSize, startDate, endDate }) => {
  return {
    pagingIndex: 0, // 目前沒做分頁所以直接給 0
    pagingSize: 0, // 目前沒做分頁所以直接給 0
    startDate,
    endDate,
  }
}
