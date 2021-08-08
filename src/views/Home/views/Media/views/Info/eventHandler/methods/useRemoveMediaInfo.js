import { useEffect } from 'react'

export function useRemoveMediaInfo() {
  // 如果從活動內層進入媒體內頁，會在 sessinStorage setItem mediaInfo，離開媒體內頁時會 removeItem
  // 但如果 user 點擊瀏覽器的上一頁並不會 removeItem，所以透過 popstate 的方式 removeItem
  useEffect(() => {
    function removeMediaInfoLocalStorage(event) {
      window.sessionStorage.removeItem('mediaInfo')
    }

    window.addEventListener('popstate', removeMediaInfoLocalStorage)
  }, [])
}
