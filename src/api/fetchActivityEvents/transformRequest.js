export default ({ pageIndex, pageSize, startDate, endDate, organizationId, placeId, eventId, isDescending, sortBy }) => {
  return {
    pagingIndex: pageIndex,
    pagingSize: pageSize,
    startDate,
    endDate,
    orgId: organizationId === 'all' ? null : organizationId, // 如果選全單位，就不對單位進行篩選
    placeId: placeId === 'all' ? null : placeId, // 如果選全市場，就不對市場進行篩選
    eventId,
    descending: isDescending,
    sort: sortBy,
  }
}
