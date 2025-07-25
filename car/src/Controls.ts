class	Controls
{
	forward: number;
	reverse: number;
	left: number;
	right: number;

	constructor(controlType: string)
	{
		this.forward = 0;
		this.reverse = 0;
		this.right = 0;
		this.left = 0;

    switch (controlType) {
			case "KEYS":
				this.#addKeyBoardListener();
				break;
			case "DUMMY":
				this.forward = 1;
				break;
		};
	};

/**
 * # ==> fonction privée
*/
	#addKeyBoardListener()
	{
		document.onkeydown = (event) => {
			switch (event.key) {
				case "ArrowUp":
					this.forward = 1;
					break;
				case "ArrowDown":
					this.reverse = 1;
					break;
				case "ArrowLeft":
					this.left = 1;
					break;
				case "ArrowRight":
					this.right = 1;
					break;
			};
		};

		document.onkeyup = (event) => {
			switch (event.key) {
				case "ArrowUp":
					this.forward = 0;
					break;
				case "ArrowDown":
					this.reverse = 0;
					break;
				case "ArrowLeft":
					this.left = 0;
					break;
				case "ArrowRight":
					this.right = 0;
					break;
			};
		};
	};
};

export default	Controls;
