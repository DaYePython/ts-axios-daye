import {axios} from '../src/index'

test('axios', () => {
    expect(id(1)).toBe(1)
    expect(id(null)).toBe(null)
    expect(id(void 0)).toBe(void 0)
})
