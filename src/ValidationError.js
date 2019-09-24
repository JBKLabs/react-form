class ValidationError extends Error {
	constructor(displayText) {
		super(displayText);
		this.displayText = displayText;
	}
}

export default ValidationError;
