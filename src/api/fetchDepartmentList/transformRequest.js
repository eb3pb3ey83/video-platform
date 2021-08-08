export default ({ pagingIndex, pagingSize, employeeId }) => {
  return {
    pagingIndex,
    pagingSize,
    empId: employeeId,
    platform: 4, // 影音平台為 4
  }
}
