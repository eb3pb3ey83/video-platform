export default ({
  pageIndex,
  pageSize,
  startDate,
  endDate,
  eventName,
  keyword,
  accessAuthority,
  placeId,
  organizationId,
  projectNo,
  fileNo,
  mediaType,
}) => {
  return {
    pagingIndex: pageIndex,
    pagingSize: pageSize,
    startDate,
    endDate,
    eventName: eventName.join('|'), // 與後端協調回傳字串且中間用 | 隔開
    keyword: keyword.join('|'), // 與後端協調回傳字串且中間用 | 隔開
    accessAuthority,
    placeId: placeId === 'all' ? null : placeId, // 如果選全市場，就不對市場進行篩選
    orgId: organizationId === 'all' ? null : organizationId, // 如果選全單位，就不對單位進行篩選
    projectNo,
    attachmentId: fileNo,
    type: mediaType,
  }
}
