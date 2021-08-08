import functionList from './function-list'

function getPairFunction(functionList) {
  return functionList.reduce((accumulateValue, currentFunction, currentIndex, functionList) => {
    const nextFunctionFirst = functionList[currentIndex + currentIndex]
    const nextFunctionSecond = functionList[currentIndex + currentIndex + 1]

    if (!nextFunctionFirst && !nextFunctionSecond) {
      return accumulateValue
    } else if (!nextFunctionSecond) {
      return [...accumulateValue, [nextFunctionFirst]]
    } else {
      return [...accumulateValue, [nextFunctionFirst, nextFunctionSecond]]
    }
  }, [])
}

export function start(firstFunction) {
  const flowList = Object.create(functionList)

  flowList.functionList = [firstFunction]

  flowList.getArgumentMethod = function(initialArguments) {
    const getArguments = returnResult => {
      return [returnResult, ...initialArguments].filter(item => typeof item !== 'undefined')
    }

    return getArguments
  }

  flowList.execute = function() {
    const flowFactory = this

    return function(...initialArguments) {
      const pairFunctionList = getPairFunction(flowFactory.functionList)
      const getArguments = flowFactory.getArgumentMethod(initialArguments)

      const getNewFunctionResult = (func, oldResult) => func.apply(this, getArguments(oldResult))

      let accumulateResult

      const executeResult = pairFunctionList.reduce((accumulateResult, pairFunction) => {
        const [firstFunction, secondFunction] = pairFunction
        const hasSecondFunction = Boolean(secondFunction)

        const firstFunctionResult = getNewFunctionResult(firstFunction, accumulateResult)

        if (!hasSecondFunction) return firstFunctionResult

        const secondFunctionResult = getNewFunctionResult(secondFunction, firstFunctionResult)

        return secondFunctionResult
      }, accumulateResult)

      return executeResult
    }
  }

  return flowList
}
