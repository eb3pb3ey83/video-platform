import { CASES } from '@/utils/to-case-keys'

console.log('CASES :>> ', CASES)

export default function getOption() {
  return {
    toResponseCase: CASES.CAMEL,
    toRequestCase: CASES.SNAKE,
  }
}
