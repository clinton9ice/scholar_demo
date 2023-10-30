import { render, screen } from '@testing-library/react'
import {Overview} from '@/components'

describe('Components confirmation', () => {
	it('Should check the props in the overview component to make sure the appropriate prop is passed', () => {
	 render(<Overview overviewInfo={{
			'total No of Students': 0,
			'No of Male Students': 0,
			'No of Female Students': 0
		}} />)
		
	expect(screen.getAllByTestId('overview-list').length).toBe(3)
	})
})
