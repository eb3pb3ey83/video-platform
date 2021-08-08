export default ({ organizationId, ...data }) => ({
  ...data,
  orgId: organizationId,
})
