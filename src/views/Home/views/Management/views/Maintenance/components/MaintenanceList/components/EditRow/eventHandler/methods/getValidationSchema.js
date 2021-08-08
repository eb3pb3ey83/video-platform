import * as Yup from 'yup'

function getValidationSchema(params) {
  return Yup.object().shape({
    itemName: Yup.string()
      .nullable()
      .trim()
      .max(20, '不能超過 20 個字元')
      .required('欄位請勿空白'),
  })
}

export default getValidationSchema
