import { NumberToNaira } from '../helpers/currencify'

describe('Helper Function', () => {
	it('should convert numbers to a valid naira currency', () => {
		expect(NumberToNaira(10000)).toBe('₦ 10,000')
	})
})
