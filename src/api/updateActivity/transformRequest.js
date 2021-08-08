export default ({ startDate, endDate, organizationId, ...restData }) => {
  return {
    ...restData,
    startDate: new Date(startDate.replace(/\//g, '-')).toISOString(),
    endDate: new Date(endDate.replace(/\//g, '-')).toISOString(),
    orgId: organizationId,
  }
}
