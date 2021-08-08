export default ({ organizationId, activityStartDate, activityEndDate, activityYear, activityName, placeId, contact }) => {
  return {
    orgId: organizationId,
    eventName: {
      year: activityYear,
      name: activityName,
    },
    startDate: activityStartDate,
    endDate: activityEndDate,
    place: placeId ? Number(placeId) : undefined,
    contact: contact,
  }
}
