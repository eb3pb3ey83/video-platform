import functionList from './function-list'

export function startFilter(firstFunction) {
  const switchList = Object.create(functionList)

  switchList.functionList = [firstFunction]

  switchList.execute = function() {
    const flowFactory = this

    return function(...initialArguments) {
      const executeResult = flowFactory.functionList.map(item => item(...initialArguments)).filter(funcResult => Boolean(funcResult))

      return executeResult
    }
  }

  return switchList
}
