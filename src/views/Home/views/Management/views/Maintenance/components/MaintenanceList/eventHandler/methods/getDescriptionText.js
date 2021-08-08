function getDescriptionText(categoryName) {
  let descriptionText

  switch (categoryName) {
    case '關鍵字':
      descriptionText = '・ 每個選項最多只能輸入20個字'
      break
    case 'TEST':
      descriptionText = 'test description content'
      break
    default:
      descriptionText = null
  }

  return descriptionText
}

export default getDescriptionText
