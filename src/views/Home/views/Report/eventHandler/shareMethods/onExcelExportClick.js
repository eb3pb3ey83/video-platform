export const onExcelExportClick = (setFieldValue, submitForm, exportType) => {
  setFieldValue('exportType', exportType)
  submitForm()
}
