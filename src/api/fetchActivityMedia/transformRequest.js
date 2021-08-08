export default ({ pageIndex, pageSize, eventId, mediaType }) => ({
  pagingIndex: pageIndex,
  pagingSize: pageSize,
  eventId,
  type: mediaType,
})
