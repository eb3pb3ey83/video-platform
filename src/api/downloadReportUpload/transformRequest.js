export default ({ organizationId, startDate, endDate }) => ({
  orgId: organizationId === 'all' ? null : organizationId, // 如果選全單位，就不對單位進行篩選
  startDate,
  endDate,
})
