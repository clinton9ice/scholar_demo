import { supaBase } from '@/db'
import { dbField } from '@/db/columnSchema'
import { FieldType } from '@/types'
import { NumberToNaira } from '@/helpers/currencify'
import dayjs from 'dayjs'

export const getALlData = async (arg: {
	runCheck?: string
	checkValue?: unknown
	select?: string
}) => {
	const result = await supaBase
		.from(dbField)
		.select(arg.select || '*')
		.eq(arg.runCheck as string, arg.checkValue)

	if (!result.error?.message && result.data) {
		const res = result.data as unknown as FieldType[]
		return Promise.resolve(
			res.map(item => ({
				...item,
				name: `${item.first_name} ${item.last_name}`,
				dob: dayjs(item.dob).format('DD MMM, YYYY'),
				salary: NumberToNaira(item?.salary || 0)
			}))
		)
	} else {
		return Promise.reject<typeof result.error>(result.error)
	}
}
