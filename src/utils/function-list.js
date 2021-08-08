export default {
  addFunctionList(newFunction) {
    const currentFunctionList = this.functionList

    this.functionList = [...currentFunctionList, newFunction]
  },

  next(newFunction) {
    this.addFunctionList(newFunction)
    return this
  },

  end(newFunction) {
    this.addFunctionList(newFunction)
    return this.execute()
  },
}
