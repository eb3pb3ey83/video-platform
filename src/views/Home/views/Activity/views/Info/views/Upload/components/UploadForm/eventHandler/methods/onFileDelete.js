import { removeArrayItem } from '@/utils/remove-array-item'

export function onFileDelete({ index, setDisplayFiles, files, displayFiles, setFieldValue, imageAngleList }) {
  setFieldValue(`imageAngleList`, removeArrayItem(index, imageAngleList))
  setFieldValue(`files`, removeArrayItem(index, files))
  setDisplayFiles(removeArrayItem(index, displayFiles))
}
