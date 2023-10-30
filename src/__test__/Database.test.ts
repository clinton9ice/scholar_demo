import { supaBase } from '../db'
import { dbTableColumns, dbField, genderTitles } from '../db/columnSchema'
describe('Database', () => {
	it(`should confirm if the database columns matches and has not been changed`, async () => {
		return supaBase
			.from(dbField)
			.select(dbTableColumns.join(','))
			.then(res => {
				const result = res.data as {}[]
				if (!Array.isArray(result)) {
					return expect(result).toBeUndefined()
				}
				if (result.length > 0) {
					expect(Object.keys(result[0])).toMatchObject(dbTableColumns)
				}
			})
	})

	it('should make sure titles are among the list of specified title fields', async () => {
		const item = await supaBase.from(dbField).select('title')
		const result = item.data as { title: string }[]
		if (Array.isArray(result)) {
			const titles = result.map(i => i.title.toLowerCase())
			const hasTitle = titles.some(i_1 =>
				genderTitles.map(g => g.toLowerCase()).includes(i_1)
			)
			expect(hasTitle).toBeTruthy()
		}
	})
})
