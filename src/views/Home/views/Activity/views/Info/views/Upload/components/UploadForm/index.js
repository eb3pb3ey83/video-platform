import React, { useState, useEffect } from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { useGlobalState } from '@/globalState'
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

// Components
import Form from '@/basicComponents/Form'
import FormItem from '@/views/Home/sharedComponents/FormItem'
import Icon from '@/basicComponents/Icon'
import IconTitle from '@/basicComponents/IconTitle'
import Button from '@/basicComponents/Button'
import MediaItem from '@/views/Home/sharedComponents/MediaItem'
import FileErrorModal from '../FileErrorModal'
import FileFullModal from '../FileFullModal'

// Lib MISC
import { isVideo, isValidFile, isValidSize, getFileUrl, isUniqueFile } from './eventHandler/methods/checkFile'
import { getOrientation } from './eventHandler/methods/getOrientation'
import { onFileDelete } from './eventHandler/methods/onFileDelete'

// constants
import { MAXIMUM_FILES_LIMITATION, MAXIMUM_FILE_SIZE_IN_GIGABYTES } from '../../../constants'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  eventName: PropTypes.string,
  eventId: PropTypes.string,
  placeOptions: PropTypes.array,
  videoLanguageOptions: PropTypes.array,
  keyWordOptions: PropTypes.array,
  roleUserOptions: PropTypes.array,
}

function UploadForm(props) {
  const { eventName, eventId, placeOptions, videoLanguageOptions, keyWordOptions, roleUserOptions } = props
  const formikContext = useFormikContext()
  const { submitForm, setFieldValue, values } = formikContext
  const [state] = useGlobalState()
  const { files, imageAngleList, accessAuthority } = values
  const inputFileRef = React.createRef()
  const [errorFiles, setErrorFiles] = useState([])
  const [displayFiles, setDisplayFiles] = useState([])
  const [isDisplayFileErrorModal, setIsDisplayFileErrorModal] = useState(false)
  const [isDisplayFileFullModal, setIsDisplayFileFullModal] = useState(false)

  useEffect(() => {
    if (Number(accessAuthority) === ACCESS_AUTHORITY.PUBLIC) {
      setFieldValue('fileReason', '')
    }
  }, [accessAuthority, setFieldValue])

  const onChange = event => {
    const clientFiles = event.currentTarget.files
    const lastFiles = [...files]
    const lastFilesAngle = [...imageAngleList]
    const errorFileList = []
    const correctFilesAngle = []

    const correctFiles = Array.from(clientFiles).filter(file => {
      const fileInfo = {
        name: file.name,
        isValidFile: isValidFile(file),
        isValidSize: isValidSize(file),
        isUniqueFile: isUniqueFile(lastFiles, file),
      }

      if (!fileInfo.isValidFile || !fileInfo.isValidSize || !fileInfo.isUniqueFile) {
        errorFileList.push(fileInfo)
      }

      return fileInfo.isValidFile && fileInfo.isValidSize && fileInfo.isUniqueFile
    })

    for (const file of Array.from(clientFiles)) {
      getOrientation(file, orientation => {
        switch (orientation) {
          case 3:
            correctFilesAngle.push(180)
            break
          case 6:
            correctFilesAngle.push(90)
            break
          case 8:
            correctFilesAngle.push(270)
            break
          case 1:
          case -1:
            correctFilesAngle.push(0)
            break
          case -2:
            correctFilesAngle.push(null)
            break
        }

        const mergeFilesAngleMaxLength = [...lastFilesAngle, ...correctFilesAngle].filter((item, index) => index < MAXIMUM_FILES_LIMITATION)

        setFieldValue('imageAngleList', mergeFilesAngleMaxLength)
      })
    }

    const mergeFilesMaxLength = [...lastFiles, ...correctFiles].filter((item, index) => index < MAXIMUM_FILES_LIMITATION)

    if (errorFileList.length > 0) {
      openDisplayFileErrorModal()
      setErrorFiles(errorFileList)
    }

    if ([...lastFiles, ...correctFiles].length > MAXIMUM_FILES_LIMITATION) {
      openDisplayFileFullModal()
    }

    setFieldValue('files', mergeFilesMaxLength)

    setDisplayFiles(
      mergeFilesMaxLength.map(file => {
        return {
          mediaViewUrl: getFileUrl(file),
          isVideo: isVideo(file),
          type: file.type,
          name: file.name.toLowerCase(),
        }
      }),
    )
    setFieldValue('organizationId', JSON.parse(window.window.localStorage.getItem('currentOrganization')).organizationIdByTeam)
    setFieldValue('eventId', eventId)

    // 讓 input 的值 reset，如此選取重複的檔案才會觸發 onChange 事件，並透過後續去判斷檔案是否重複，並跳 modal 警告訊息
    // REF: https://github.com/ngokevin/react-file-reader-input/issues/11
    event.currentTarget.value = ''
  }

  const openDisplayFileErrorModal = () => {
    setIsDisplayFileErrorModal(true)
  }

  const closeDisplayFileErrorModal = () => {
    setIsDisplayFileErrorModal(false)
  }

  const openDisplayFileFullModal = () => {
    setIsDisplayFileFullModal(true)
  }

  const closeDisplayFileFullModal = () => {
    setIsDisplayFileFullModal(false)
  }

  const copyTitleNameToDescriptionName = () => {
    setFieldValue('descriptionName', eventName)
  }

  return (
    <>
      <div className={cx('activity-info-upload-wrapper--top')}>
        <div className={cx('activity-info-upload-container')}>
          <div className={cx('upload-form')}>
            <div className={cx('upload-form-user')}>
              <IconTitle titleName='上傳者'>
                <Icon.Man />
              </IconTitle>
              <div className={cx('upload-form-user__info')}>
                <FormItem name='單位' isViewMode>
                  {`${JSON.parse(window.window.localStorage.getItem('currentOrganization')).departmentName}`}
                </FormItem>
                <FormItem name='姓名' isViewMode>
                  {`${state.user.userInfo.employeeName} [員編：${state.user.userInfo.employeeId}]`}
                </FormItem>
              </div>
            </div>
            <IconTitle titleName='編輯媒體圖說'>
              <Icon.Info />
            </IconTitle>
            <div className={cx('upload-form-description')}>
              <div className={cx('upload-form-description__enter')}>
                <div className={cx('upload-form-description-authority')}>
                  <Form.RadioGroupField group='accessAuthority' className={cx('upload-form__radio')}>
                    <Form.RadioField label='公開' value='1' />
                    <Form.RadioField label='不公開' value='2' />
                  </Form.RadioGroupField>
                  <Form.FlexibleTextareaField
                    className={cx('upload-form__textarea')}
                    placeholder='請填寫不公開理由，至多50字'
                    maxLength={50}
                    name='fileReason'
                    disabled={Number(accessAuthority) === ACCESS_AUTHORITY.PUBLIC}
                    size='xl'
                    resize={false}
                  />
                </div>
                <FormItem name='*描述' nameWidth={134} marginBottom={23}>
                  <Form.InputField name='descriptionName' placeholder='請輸入圖說描述' className={cx('upload-form__input')} maxLength={150} />
                </FormItem>
                <FormItem name='工作計畫編號(選填)' nameWidth={134} marginBottom={23}>
                  <Form.InputField
                    name='descriptionProjectNo'
                    placeholder='請輸入7碼工作計畫編號'
                    maxLength={7}
                    className={cx('upload-form__input')}
                  />
                </FormItem>
                <FormItem name='首長(選填)' nameWidth={134} marginBottom={23}>
                  <Form.MultiSelectField name='descriptionLeaderId' options={roleUserOptions} placeholder='請選擇首長' />
                </FormItem>
              </div>
              <div className={cx('upload-form-description__other')}>
                <Button type='primary' onClick={copyTitleNameToDescriptionName}>
                  帶入活動名稱
                </Button>
              </div>
              <div className={cx('upload-form-description__enter')}>
                <FormItem name='關鍵字(選填)' nameWidth={134} marginBottom={23}>
                  <Form.MultiSelectField name='descriptionKeyWords' options={keyWordOptions} placeholder='請選擇關鍵字' />
                </FormItem>
                <FormItem name='影音發音語言(選填)' nameWidth={134} marginBottom={23}>
                  <Form.CreatableSelectField name='descriptionLanguage' height='40px' options={videoLanguageOptions} placeholder='請選擇語言' />
                </FormItem>
                <FormItem name='市場(選填)' nameWidth={134} marginBottom={23}>
                  <Form.SelectField name='descriptionPlace' options={placeOptions} placeholder='請輸入洲別/國家' height={40} />
                </FormItem>
                <FormItem name='自訂關鍵字(選填)' nameWidth={134} marginBottom={23}>
                  <Form.MultiCreateInputField maxLength={15} textMaxLength={20} name='descriptionCustomizekeywords' placeholder='請輸入自訂關鍵字' />
                  <p className={cx('upload-form__description')}>每組輸入後，按enter鍵出現X鍵後鎖定</p>
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('activity-info-upload-wrapper')}>
        <div className={cx('activity-info-upload-container')}>
          <div className={cx('upload-function')}>
            <div className={cx('upload-function__choose-file')}>
              <input type='file' ref={inputFileRef} className={cx('upload-function__input-file')} onChange={onChange} multiple />
              <span className={cx('upload-function__title')}>選擇媒體檔案:</span>
              <span className={cx('upload-function__text')}>請選擇欲上傳之媒體檔案</span>
              <Button type='primary' onClick={() => inputFileRef.current.click()} disabled={files.length >= MAXIMUM_FILES_LIMITATION}>
                選擇檔案
              </Button>
              <span className={cx('upload-function__reminder')}>
                <p>・ 批次上傳時，每次至多{MAXIMUM_FILE_SIZE_IN_GIGABYTES}G</p>
              </span>
            </div>
            <div className={cx('upload-function__upload')}>
              <Button
                type='primary'
                prefix={<Icon.Upload role='upload-icon' />}
                onClick={event => {
                  if (files.length === 0) {
                    openDisplayFileErrorModal()
                    return
                  }

                  return submitForm()
                }}
              >
                上傳
              </Button>
            </div>
          </div>
          <div className={cx('upload-media-list')}>
            {displayFiles.map((file, index) => {
              return (
                <div key={index} className={cx('upload-media-item')}>
                  <MediaItem.Thumbnail
                    index={index}
                    mediaViewUrl={file.mediaViewUrl}
                    mediaHlsUrl={file.mediaViewUrl}
                    setFieldValue={setFieldValue}
                    currentImageAngle={imageAngleList[index]}
                    onFileDelete={() => onFileDelete({ index, setDisplayFiles, files, displayFiles, setFieldValue, imageAngleList })}
                    isUploading
                    hasWaterMark={false}
                    type={file.name} // 上傳時取檔名裡的副檔名做判斷
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <FileErrorModal isOpened={isDisplayFileErrorModal} onClose={closeDisplayFileErrorModal} errorFiles={errorFiles} />
      <FileFullModal isOpened={isDisplayFileFullModal} onClose={closeDisplayFileFullModal} />
    </>
  )
}

UploadForm.propTypes = propTypes

export default UploadForm
