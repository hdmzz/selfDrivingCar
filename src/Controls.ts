class	Controls
{
	forward: boolean;
	reverse: boolean;
	left: boolean;
	right: boolean;

	constructor(controlType: string)
	{
		this.forward = false;
		this.reverse = false;
		this.right = false;
		this.left = false;

    switch (controlType) {
			case "KEYS":
				this.#addKeyBoardListener();
				break;
			case "DUMMY":
				this.forward = true;
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
					this.forward = true;
					break;
				case "ArrowDown":
					this.reverse = true;
					break;
				case "ArrowLeft":
					this.left = true;
					break;
				case "ArrowRight":
					this.right = true;
					break;
			};
		};

		document.onkeyup = (event) => {
			switch (event.key) {
				case "ArrowUp":
					this.forward = false;
					break;
				case "ArrowDown":
					this.reverse = false;
					break;
				case "ArrowLeft":
					this.left = false;
					break;
				case "ArrowRight":
					this.right = false;
					break;
			};
		};
	};
};

export default	Controls;
