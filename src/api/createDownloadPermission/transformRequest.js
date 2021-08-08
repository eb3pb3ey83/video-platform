export default ({ applicant, organizationId, startDate, endDate, eventId }) => {
  const newEventId = eventId.map(item => item.id)

  return {
    applicant,
    orgId: organizationId,
    startDate,
    endDate,
    eventId: newEventId,
  }
}
