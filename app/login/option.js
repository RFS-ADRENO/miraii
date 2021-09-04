module.exports = function ({ api }) {
	const options = {
		forceLogin: true,
		listenEvents: true,
		logLevel: "error",
		updatePresence: false,
		selfListen: true,
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
	}
	api.setOptions(options);
}
