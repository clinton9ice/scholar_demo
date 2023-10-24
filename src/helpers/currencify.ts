export const NumberToNaira = (val: string | number) => {
	if (typeof val === 'string' || typeof val === 'number') {
		const amount = String(val)
			.replace(/\D/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		return '₦ ' + amount
	}
}
