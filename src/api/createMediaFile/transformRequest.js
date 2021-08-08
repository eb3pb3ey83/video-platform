import toCaseKeys, { CASES } from '@/utils/to-case-keys'

export default ({
  organizationId,
  descriptionName,
  descriptionProjectNo,
  descriptionLeaderId,
  descriptionKeyWords,
  descriptionLanguage,
  descriptionPlace,
  descriptionCustomizekeywords,
  ...restData
}) => ({
  ...restData,
  ...(descriptionProjectNo && { descProjectno: descriptionProjectNo }),
  ...(descriptionLeaderId && {
    descLeaderId: JSON.stringify(descriptionLeaderId.map(item => toCaseKeys(JSON.parse(item), CASES.SNAKE))),
  }),
  ...(descriptionKeyWords && { descKeywords: JSON.stringify(descriptionKeyWords) }),
  ...(descriptionLanguage && { descLanguage: descriptionLanguage }),
  ...(descriptionPlace && { descPlace: descriptionPlace }),
  ...(descriptionCustomizekeywords && { descCustomizekeywords: JSON.stringify(descriptionCustomizekeywords) }),
  orgId: organizationId,
  descName: descriptionName,
})
