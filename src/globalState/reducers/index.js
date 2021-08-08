import { combineReducers } from '../helpers/combineReducers'
import user from './user'
import apiResponse from './apiResponse'
import assetUpload from './assetUpload'
import organization from './organization'

export default combineReducers({
  user,
  apiResponse,
  assetUpload,
  organization,
})
