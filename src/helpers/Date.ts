import dayjs, { Dayjs } from 'dayjs'

export const disableAgeLessThan21 = (current: Dayjs) => {
	const requiredDate = dayjs().subtract(21, 'year')
	const date = dayjs()
	// Disable previous days and start from the minimum of 21 years
	return (
		(current && date.year() < current.year()) ||
		requiredDate.year() < current.year()
	)
}

export const age21 = dayjs().subtract(21, 'year')

export const disabledAgeHigherThan21 = (current: Dayjs) => {
	let requiredDate = dayjs().subtract(22, 'year')
	const date = dayjs()
	// Disable previous days and limit age to 21
	return (
		(current && date.year() < current.year()) ||
		requiredDate.year() > current.year()
	)
}
export const currentAge21 = dayjs().subtract(22, 'year')
