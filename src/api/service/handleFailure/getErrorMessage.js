export default function getErrorMessage(response, apiInfo) {
  const { status } = response

  const messages = apiInfo.withAccessToken
    ? {
        400: '參數錯誤。',
        401: '憑證已過期。',
        403: '無管理者權限，請洽系統管理員。',
        404: '找不到該筆資料。',
        422: '時間重疊。',
      }
    : {
        400: '參數錯誤。',
        401: '密碼錯誤，請確認後重新輸入！',
        403: '無管理者權限，無法登入，請洽系統管理員。',
        404: '帳號不存在，請確認後重新輸入！',
      }

  return messages[status] || 'Unhandled Error!'
}
