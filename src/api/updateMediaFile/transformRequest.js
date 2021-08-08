import toCaseKeys, { CASES } from '@/utils/to-case-keys'

export default ({
  attachmentId,
  organizationId,
  accessAuthority,
  description,
  projectNo,
  leader,
  keywords,
  language,
  place,
  customizekeywords,
  fileRotation,
  fileReason,
}) => ({
  attachmentId,
  orgId: organizationId,
  accessAuthority,
  descName: description,
  fileRotation,
  ...(projectNo && { descProjectno: projectNo }),
  ...(leader && {
    descLeaderId: leader.map(item => toCaseKeys(JSON.parse(item), CASES.SNAKE)),
  }),
  ...(keywords && { descKeywords: keywords }),
  ...(language && { descLanguage: language }),
  ...(place && { descPlace: place }),
  ...(customizekeywords && { descCustomizekeywords: customizekeywords }),
  fileReason,
})
