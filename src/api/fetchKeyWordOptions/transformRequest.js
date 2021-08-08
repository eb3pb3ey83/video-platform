export default ({ hasAll, isQuery }) => {
  return {
    all: isQuery, // 後端 all true 時代表 place options 是用來查詢， false 是在新增或編輯時使用 //預設 false
    // query: hasAll, // 後端 query true 時 options 第一個自動帶入全市場 //預設 false
  }
}
