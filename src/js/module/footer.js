define(["jquery"], $ => {
	class Footer {
		constructor () {
			this.init().then(() => {
				this.bottom();
			});
		}
		init () {
			return new Promise(resolve => {
				$("#footer-container").load("/html/module/footer.html", () => {
					resolve();
				})
			})
		}

		bottom () {

		}

	}
	return new Footer();
})