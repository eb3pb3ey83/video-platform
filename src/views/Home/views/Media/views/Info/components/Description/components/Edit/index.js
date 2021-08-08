import React, { useEffect } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

// Components
import Icon from '@/basicComponents/Icon'
import Input from '@/basicComponents/Input'
import IconTitle from '@/basicComponents/IconTitle'
import Form from '@/basicComponents/Form'
import MediaInfoColumn from '../../../../sharedComponents/MediaInfoColumn'
import FormItem from '@/views/Home/sharedComponents/FormItem'

// Lib MISC
import { usePlaceOptions } from '@/views/Home/eventHandler/shareComputedValues/usePlaceOptions'
import { useVideoLanguageOptions } from '@/views/Home/eventHandler/shareComputedValues/useVideoLanguageOptions'
import { useKeyWordOptions } from '@/views/Home/eventHandler/shareComputedValues/useKeyWordOptions'
import { useRoleUserOptions } from '@/views/Home/eventHandler/shareComputedValues/useRoleUserOptions'
import { canDisplayFileType } from '@/utils/can-display-file-type'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  data: PropTypes.shape({
    attachmentId: PropTypes.number,
    accessAuthority: PropTypes.number,
    downloadCount: PropTypes.string,
    viewCount: PropTypes.string,
    fileFormat: PropTypes.string,
    format: PropTypes.string,
    fileLength: PropTypes.string,
    deptName: PropTypes.string,
    createdUser: PropTypes.string,
    updatedUser: PropTypes.string,
    updatedTime: PropTypes.string,
    description: PropTypes.string,
    projectNo: PropTypes.string,
    leader: PropTypes.string,
    keywords: PropTypes.string,
    language: PropTypes.string,
    place: PropTypes.string,
    customizekeywords: PropTypes.string.array,
  }),
  permissions: PropTypes.shape({
    canEditAuthorityByAll: PropTypes.bool,
  }),
  eventId: PropTypes.number,
}

function Edit(props) {
  const { data, permissions, eventId } = props
  const { format } = data
  const { canEditAuthorityByAll } = permissions
  const { values, setFieldValue } = useFormikContext()

  const { placeOptions } = usePlaceOptions({ hasAll: false, isQuery: true })
  const { videoLanguageOptions } = useVideoLanguageOptions({ hasAll: false, isQuery: true })
  const { keyWordOptions } = useKeyWordOptions({ hasAll: false, isQuery: true })
  const { roleUserOptions } = useRoleUserOptions({ hasAll: false, isQuery: true })
  const { isValidVideo } = canDisplayFileType(format) // AWS 轉檔後可顯示格式

  useEffect(() => {
    if (Number(values.accessAuthority) === ACCESS_AUTHORITY.PUBLIC) {
      setFieldValue('fileReason', '')
    }
  }, [setFieldValue, values.accessAuthority])

  return (
    <MediaInfoColumn gridArea='description-info' isEditMode>
      <div className={cx('media-info__column-zone')}>
        <IconTitle titleName='圖說資訊'>
          <Icon.Info role='media-icon' />
        </IconTitle>

        <div className={cx('media-info__authority')}>
          <Form.RadioGroupField group='accessAuthority' className={cx('media-info__radio')} disabled={!canEditAuthorityByAll}>
            <Form.RadioField label='公開' value='1' />
            <Form.RadioField label='不公開' value='2' />
          </Form.RadioGroupField>
          <Form.FlexibleTextareaField
            wrapperClassName={cx('media-info__textarea-wrapper')}
            className={cx('media-info__textarea')}
            placeholder='請填寫不公開理由，至多50字'
            maxLength={50}
            name='fileReason'
            disabled={Number(values.accessAuthority) === ACCESS_AUTHORITY.PUBLIC || !canEditAuthorityByAll}
            size='lg'
            resize={false}
          />
        </div>

        <FormItem name='*描述' nameWidth={134} maxHeight={40}>
          <Form.InputField name='description' placeholder='請輸入圖說描述' className={cx('media-info__input')} maxLength={150} />
        </FormItem>

        <FormItem name='活動編號' nameWidth={134} maxHeight={40}>
          <Input className={cx('media-info__input')} readOnly disabled value={eventId} />
        </FormItem>

        <FormItem name='工作計畫編號(選填)' nameWidth={134} maxHeight={40}>
          <Form.InputField name='projectNo' placeholder='請輸入7碼工作計畫編號' maxLength={7} className={cx('media-info__input')} />
        </FormItem>

        <FormItem name='首長(選填)' nameWidth={134} maxHeight={40}>
          <Form.MultiSelectField name='leader' options={roleUserOptions} placeholder='請選擇首長' />
        </FormItem>

        <FormItem name='關鍵字(選填)' nameWidth={134} maxHeight={40}>
          <Form.MultiSelectField name='keywords' options={keyWordOptions} placeholder='請選擇關鍵字' />
        </FormItem>

        <FormItem name='影音發音語言(選填)' nameWidth={134} maxHeight={40}>
          <Form.CreatableSelectField
            name='language'
            height='40px'
            options={videoLanguageOptions}
            placeholder='請選擇語言'
            isDisabled={!isValidVideo}
          />
        </FormItem>

        <FormItem name='市場(選填)' nameWidth={134} maxHeight={40}>
          <Form.SelectField name='place' options={placeOptions} placeholder='請輸入單一國家或州別' height={40} />
        </FormItem>

        <FormItem name='自訂關鍵字(選填)' nameWidth={134} maxHeight={40}>
          <Form.MultiCreateInputField textMaxLength={20} maxLength={15} name='customizekeywords' placeholder='請輸入自訂關鍵字' />
          <p className={cx('media-info__description')}>每組輸入後，按enter鍵出現X鍵後鎖定</p>
        </FormItem>
      </div>
    </MediaInfoColumn>
  )
}

Edit.propTypes = propTypes

export default Edit
