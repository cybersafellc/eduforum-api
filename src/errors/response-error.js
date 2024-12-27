class ResponseError extends Error {
	constructor(ststus, message) {
		super(message);
		this.ststus = ststus;
	}
}
export { ResponseError };
