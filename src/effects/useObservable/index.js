import { useEffect } from 'react'

function useObservable(observable, setter) {
  useEffect(() => {
    const observer = {
      next: result => setter(result),
      error: error => console.log('Error: ', error),
      complete: () => console.log('complete'),
    }
    const subscription = observable.subscribe(observer)

    return () => subscription.unsubscribe()
  }, [observable, setter])
}

export default useObservable
