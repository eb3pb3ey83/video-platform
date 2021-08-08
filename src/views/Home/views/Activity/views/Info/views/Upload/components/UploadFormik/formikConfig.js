import * as Yup from 'yup'
import { isNull } from 'lodash'
import { removeObjectEmptyValue } from '@/utils/remove-object-empty-value'
import { handleSubmittedForm } from './eventHandler/methods/handleSubmittedForm'
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

export default (props, dispatch) => {
  const { goInfo } = props

  const mediaPlaceId = localStorage.getItem('mediaPlaceId')

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      descriptionName: Yup.string().required('請輸入圖說描述'),
      descriptionProjectNo: Yup.string()
        .min(7, '請輸入最少七位數英數字')
        .matches(/^[a-zA-Z0-9 ]+$/, '格式不符合'),
      fileReason: Yup.string().when('accessAuthority', {
        is: value => value === String(ACCESS_AUTHORITY.ALL),
        then: Yup.string().required('請輸入不公開理由'),
      }),
    }),

    initialValues: {
      eventId: 0,
      organizationId: '',
      accessAuthority: '1',
      descriptionName: '',
      descriptionProjectNo: '',
      descriptionLeaderId: [],
      descriptionKeyWords: [],
      descriptionLanguage: '國語',
      descriptionPlace: Number(mediaPlaceId) || '',
      descriptionCustomizekeywords: [],
      files: [],
      imageAngleList: [],
      fileReason: '',
    },

    onSubmit(data) {
      const uploadActions = data.files.map((file, index) => {
        const fileRotation = data.imageAngleList[index]

        return () =>
          handleSubmittedForm(
            {
              ...removeObjectEmptyValue({
                eventId: data.eventId,
                accessAuthority: data.accessAuthority,
                organizationId: data.organizationId,
                descriptionName: data.descriptionName,
                descriptionProjectNo: data.descriptionProjectNo,
                descriptionLanguage: data.descriptionLanguage,
                descriptionLeaderId: data.descriptionLeaderId,
                descriptionKeyWords: data.descriptionKeyWords,
                descriptionPlace: data.descriptionPlace,
                descriptionCustomizekeywords: data.descriptionCustomizekeywords,
                fileReason: data.fileReason,
              }),
              ...(!isNull(fileRotation) && { fileRotation }),
              fileName: file.name,
              file: file,
            },
            dispatch,
          )
      })

      goInfo()

      for (const action of uploadActions) action()
    },
  }
}
