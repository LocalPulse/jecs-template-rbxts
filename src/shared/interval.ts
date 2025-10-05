export type IntervalThrottle = () => boolean;

export function interval(seconds: number): IntervalThrottle {
	let pin: number | undefined;

	const throttle = () => {
		if (pin === undefined) pin = os.clock();

		const elapsed = (os.clock() - pin) > seconds;
		if (elapsed) pin = os.clock();
		return elapsed;
	};

	return throttle;
}

export default interval;
