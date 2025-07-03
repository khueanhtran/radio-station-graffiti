/**
 * 
 * M9: Another Kind of CC
 * Radio Station Wall Graffiti Maker
 * This program allows users to add texts, drawings, and coloured lighting to 
 * a blank wall canvas to mimic the aesthetic of graffitis on the walls of a 
 * college radio station. Inspired by Bowdoin's WBOR station at Dudley Coe.
 * 
 * Author: Khue Anh Tran
 * 
 */


// Sets up global variables
var textInput; var writeButton; var drawButton; var submitButton; 
var gradientButton; var randomizeGradientButton; 
var helpButton; var saveButton;
var texts = []; var drawings = [];
var fonts = [];
var buttonClicked = false; var drawButtonClicked = false;
var currentlyDrawing = false; var changingGradient = false; 
var randomizeGradient = true;
var fontSizeSlider; var strokeSlider; var fontSlider;
var redSlider; var greenSlider; var blueSlider; 
var fontSizeSliderVisible = false; var strokeSliderVisible = false; 
var helpVisible = false;
var canvas; var drawingLayer; var gradientLayer; var helpLayer;
var r1Grad; var b1Grad; var g1Grad; var r2Grad; var b2Grad; var g2Grad;
var height; var width; var offset;

/**
 * Loads in selected fonts downloaded from Google Fonts.
 */
function preload() {
	cedarville = loadFont('assets/CedarvilleCursive-Regular.ttf');
	lacquer = loadFont('assets/Lacquer-Regular.ttf');
	rockSalt = loadFont('assets/RockSalt-Regular.ttf');
	rubikBurned = loadFont('assets/RubikBurned-Regular.ttf');
	rubikPuddles = loadFont('assets/RubikPuddles-Regular.ttf');
	amatic = loadFont('assets/AmaticSC-Regular.ttf');
	gochiHand = loadFont('assets/GochiHand-Regular.ttf');
	liujian = loadFont('assets/LiuJianMaoCao-Regular.ttf');
	reenieBeanie = loadFont('assets/ReenieBeanie-Regular.ttf');
	fonts = [cedarville, lacquer, rockSalt, rubikBurned, rubikPuddles, 
			amatic, gochiHand, liujian, reenieBeanie];
  }

/**
 * Establishes the main canvas and graphics layers of the program. Initialize
 * option buttons and sliders.
 */
function setup() {
	width = 500;
	height = windowHeight;
	offset = 20; // For the help layer
	
	canvas = createCanvas(width, height);
	widthOffset = (windowWidth - width) / 2; 
	canvas.position(widthOffset, 0); // Centers the canvas in the middle
	background(235, 219, 192);
	
	// Separate layer for line drawings
	drawingLayer = createGraphics(width, height);
	
	// Separate layer for gradient lighting background
	gradientLayer = createGraphics(width, height);
	
	// Separate layer for the pop-up help section
	helpLayer = createGraphics(width - offset, height - offset);
	

	// Slider to change the font size of the added text
	fontSizeSlider = createSlider(10, 100, 20);
	fontSizeSlider.position(160, 410);

	// Slider to change the font type of the added text
	numFonts = fonts.length;
	fontSlider = createSlider(0, numFonts - 1);
	fontSlider.position(160, 480);

	// Slider to change the size of the stroke for line drawings
	strokeSlider = createSlider(1, 50, 5);
	strokeSlider.position(160, 410);


	// Sliders for R, G, and B values separately

	redSlider = createSlider(0, 255, 127);
	redSlider.position(160, 200);

	greenSlider = createSlider(0, 255, 127);
	greenSlider.position(160, 270);

	blueSlider = createSlider(0, 255, 127);
	blueSlider.position(160, 340);
	
	hideAllSliders(); // Sliders not displayed initially
	
	// Button for adding text option
	writeButton = createButton("write something");
	writeButton.position(80, 110);
	writeButton.mousePressed(() => { // When button clicked
		buttonClicked = true;
		hideTopButtons();
		submitText(); // Calls on function to submit text input
		// Shows relevant sliders
		showRGBSliders();
		showSlider(fontSizeSlider, '#fontSizeLabel');
		showSlider(fontSlider, '#fontLabel');
		fontSizeSliderVisible = true;
	})
	
	// Button for line drawing option
	drawButton = createButton("draw something");
	drawButton.position(223, 110);
	drawButton.mouseClicked(() => { // When button clicked
		drawButtonClicked = true;
		currentlyDrawing = true;
		hideTopButtons();
		// Shows relevant sliders
		showRGBSliders();
		showSlider(strokeSlider, '#strokeLabel');
		strokeSliderVisible = true;
	})
	
	// Button for changing the colours of the lighting
	gradientButton = createButton("change lighting");
	gradientButton.position(80, 150);
	gradientButton.mousePressed(() => {
		changingGradient = true;
		hideTopButtons();
	})
	
	// Button for randomizing the colours of the lighting
	randomizeGradientButton = createButton("randomize lighting");
	randomizeGradientButton.position(210, 150);
	randomizeGradientButton.mousePressed(() => {
		randomizeGradient = true;
	})

	// Button for opening the help section (for instructions)
	helpButton = createButton("help");
	helpButton.position(80, 530);
	helpButton.mousePressed(() => {
		helpVisible = true;
	})

	// Button for saving the canvas as a downloaded image file
	saveButton = createButton("save image");
	saveButton.position(150, 530);
	saveButton.mousePressed(() => {
		save('graffiti-wall.png');
	})
}


/**
 * Displays a given slider and its label.
 */
function showSlider(slider, label) {
	slider.show();
	select(label).style('visibility', 'visible');
}


/**
 * Displays RGB sliders.
 */
function showRGBSliders() {
	showSlider(redSlider, '#redLabel');
	showSlider(greenSlider, '#greenLabel');
	showSlider(blueSlider, '#blueLabel');
}


/**
 * Hides a given slider and its label.
 */
function hideSlider(slider, label) {
	slider.hide();
	select(label).style('visibility', 'hidden');
}


/**
 * Hides RGB sliders.
 */
function hideRGBSliders() {
	hideSlider(redSlider, '#redLabel');
	hideSlider(greenSlider, '#greenLabel');
	hideSlider(blueSlider, '#blueLabel');
}


/**
 * Hides all sliders.
 */
function hideAllSliders() {
	hideRGBSliders();
	hideSlider(fontSizeSlider, '#fontSizeLabel');
	hideSlider(fontSlider, '#fontLabel');
	hideSlider(strokeSlider, '#strokeLabel');
}


/**
 * Hides the option buttons at the top of the page.
 */
function hideTopButtons() {
	writeButton.hide(); 
	drawButton.hide(); 
	gradientButton.hide(); 
	randomizeGradientButton.hide(); 
}


/**
 * Displays the option buttons at the top of the page.
 */
function showTopButtons() {
	writeButton.show(); 
	drawButton.show(); 
	gradientButton.show(); 
	randomizeGradientButton.show(); 
}


/**
 * Takes in a text input to be added to the canvas.
 */
function submitText() {
	// Creates input field for user to submit text
	textInput = createInput();
	textInput.position(115, 110);
  
	// Button to submit the input
	submitButton = createButton("submit");
	submitButton.position(270, 110);
	submitButton.mousePressed(() => {
	// Prevents button click from being read as mouse press for text location
	buttonClicked = true;
	addTextFromInput(); // Calls function to display input text
		textInput.hide();
		submitButton.hide();
		hideTopButtons();
	});
}


/**
 * Represents each individual text object added to the canvas. Contains
 * attributes of the text's string, position, size, colour, font, and some
 * boolean flags for control flow. Implements functions to display and
 * update the text.
 */
class Text {
	constructor(str) {
		this.str = str;
		this.x = -5;
		this.y = -5;
		this.size = 0;
		this.col = (0, 0, 0);
		this.font = 'Georgia';
		this.added = false; // Tracks if text input has been added to list
		this.located = false; // Tracks if text has been put onto the canvas
		this.done = false; // Tracks if text has been finalized
	}
  
 	// Displays text with current properties
	display() {
		textSize(this.size);
		fill(this.col);
		textFont(this.font);
		text(this.str, this.x, this.y);
	}
  
 	// Changes size of text
	changeSize(size) {
		this.size = size;
	}
  
  	// Changes colour of text
	changeColour(col) {
		this.col = col;
	}
  
	// Changes position of text
	changePosition(x, y) {
		this.x = x;
		this.y = y;
	}

	// Changes font of text
	changeFont(newFont) {
		this.font = newFont;
	}
  
	// Marks the text as added
	changeToAdded() {
		this.added = true;
	}
	
	// Marks the text as located
	changeToLocated() {
		this.located = true;
	}
  
	// Marks the text as finalized
	changeToDone() {
		this.done = true;
	}
	
	// Changes the text's attributes according to the relevant sliders.
	update() {
		let size;
		if (fontSizeSliderVisible) {
			size = fontSizeSlider.value();
		}
		// Disregards if stroke size slider is visible instead (they overlap)
		else { 
			size = 0;
		}

		// Gets color from individual RGB values from sliders
		col = color(redSlider.value(), greenSlider.value(), blueSlider.value());

		// Indexes into fonts array using index from slider
		let newFont = fonts[int(fontSlider.value())];

		// Updates the text's size, colour, and font based on slider values
		this.changeSize(size);
		this.changeColour(col);
		this.changeFont(newFont);
	}
}


/**
 * Adds input text to array of texts to be displayed.
 */
function addTextFromInput() {
	// Only consider next text input if array empty or 
	// if the previous input has been finalized
	if (texts.length === 0 || texts[texts.length - 1].done) {
		// Gets text from input field
		let currInput = textInput.value();

		// Only proceed if there is an actual text input
		if (currInput !== '') {
			// Creates new Text object with the text input
			let newText = new Text(currInput);
				
			// Adds the new Text object to the array of texts
			texts.push(newText);
			
			// Marks the text as added
			newText.changeToAdded();
		}
	}
	
	textInput.value(''); // Clears the input field after submitting
}


/**
 * Determines what happens when the user presses on the mouse.
 */
function mousePressed() {
	// For placing the text at a user-chosen location on the canvas
	if (!currentlyDrawing && texts.length > 0) {
		let lastText = texts[texts.length - 1];

		// Only places text if it has not been located yet and the mouse press
		// was not a button click
		if (lastText.added && !lastText.located && !buttonClicked) {
			// Updates position of text based on where the user clicked
			let x = mouseX;
			let y = mouseY;
			lastText.changePosition(x, y);
			lastText.changeToLocated(); // Marks text as located
		}
	}
	// Resets the flag for button clicks
	buttonClicked = false;
}


/**
 * Determines what happens when a key is pressed. Mostly deals with ENTER.
 */
function keyPressed() {
	// When finished with adding and changing a text
	if (keyCode === ENTER && !currentlyDrawing && texts.length > 0 && !helpVisible) {
    	// Marks the last added text as done when ENTER is pressed
		let lastText = texts[texts.length - 1];
		lastText.changeToDone();
		// Resets buttons and sliders display
		showTopButtons();
		hideRGBSliders();
		hideSlider(fontSizeSlider, '#fontSizeLabel');
		fontSizeSliderVisible = false;
		hideSlider(fontSlider, '#fontLabel');
	}

	// When finished with adding a line drawing
	if (keyCode === ENTER && currentlyDrawing && !helpVisible) {
		// Stops drawing mode when ENTER is pressed
		currentlyDrawing = false;
		// Resets buttons and sliders display
		showTopButtons();
		hideRGBSliders();
		hideSlider(strokeSlider, '#strokeLabel');
		strokeSliderVisible = false;
	}

	// When finished with changing the lighting colours
	if (keyCode === ENTER && changingGradient && !helpVisible) {
		changingGradient = false;
		showTopButtons();
	}

	// When finished with looking at the help section
	if (keyCode === ENTER && helpVisible) {
		helpVisible = false;
	}
}


/**
 * Displays the background colour gradients based on current RGB values of
 * the two endpoint colours.
 */
function displayLighting() {
	c1 = color(r1Grad, g1Grad, b1Grad);
	c2 = color(r2Grad, g2Grad, b2Grad);
	for (let i = 0; i < height; i += 1) {
		amt = map(i, 0, height, 0, 1); // Gets intermediary proportion value
		col = lerpColor(c1, c2, amt); // Gets intermediate colour
		col.setAlpha(20); // Reduces opacity
		gradientLayer.stroke(col);
		gradientLayer.line(0, i, width, i);
	}
}


/**
 * Randomizes RGB values of the two endpoint colours.
 */
function randomizeLighting() {
	r1Grad = int(random(256));
	g1Grad = int(random(256));
	b1Grad = int(random(256));
	r2Grad = int(random(256));
	g2Grad = int(random(256));
	b2Grad = int(random(256));
	randomizeGradient = false;
}


/**
 * Changes the endpoint colours according to the movement of the user's mouse.
 */
function changeLighting() {
	// Do nothing if the mouse is not moving
	if (mouseX === pmouseX && mouseY === pmouseY) {
		return;
	// If mouse moves right and up
	} else if (mouseX > pmouseX && mouseY > pmouseY) {
		// Modulo to always get value within 0-255 range for RGB values
		r1Grad = (r1Grad + int(random(20))) % 255;
		// Random value of change
		g2Grad = (g2Grad + int(random(20))) % 255;
	// If mouse moves right and down
	} else if (mouseX > pmouseX && mouseY < pmouseY) {
		g1Grad = (g1Grad + int(random(20))) % 255;
		r2Grad += (r2Grad + int(random(20))) % 255;
	// If mouse moves left and up
	} else if (mouseX < pmouseX && mouseY > pmouseY) {
		b2Grad = (b1Grad + int(random(20))) % 255;
		r2Grad = (r2Grad + int(random(20))) % 255;
	// Other cases
	} else {
		g1Grad = (g1Grad + int(random(20))) % 255;
		b2Grad = (b2Grad + int(random(20))) % 255;
	}	
}


/**
 * Displays the help section.
 */
function help() {
	// Only displays this graphics layer when this function is called
	image(helpLayer, offset, offset);
	helpLayer.fill(239, 243, 228);
	helpLayer.rect(offset, offset, width - offset*4, height - offset*4);
	helpWidth = width - offset*5;
	helpHeight = height - offset*5;
	
	// Displays lines of instructions

	helpLayer.textSize(20);
	helpLayer.fill(0, 0, 0);
	helpLayer.text("INSTRUCTIONS", helpWidth / 2 - 40, offset + 60);
	
	helpLayer.textSize(12);
	line1 = "Click on the buttons to select an option.";
	helpLayer.text(line1, offset + 10, offset + 110);
	
	line2 = "For writing, submit the text you want then click on a position";
	helpLayer.text(line2, offset + 10, offset + 140);
	line3 = "on the wall canvas to place it.";
	helpLayer.text(line3, offset + 10, offset + 155);
	
	line4 = "For drawing, drag the mouse to draw lines.";
	helpLayer.text(line4, offset + 10, offset + 185);
	
	line5 = "When writing and drawing, sliders to change the colours and " +
	"font/stroke size";
	helpLayer.text(line5, offset + 10, offset + 215);
	line6 = "will apear. Sliders can apply to texts after locating " +
	"(but before pressing";
	helpLayer.text(line6, offset + 10, offset + 230);
	line7 = "ENTER), but do not apply to drawings/lines " +
	"after they are already drawn.";
	helpLayer.text(line7, offset + 10, offset + 245);
	
	line8 = "For changing lighting colours, move the mouse around " +
	"to view the colour";
	helpLayer.text(line8, offset + 10, offset + 275);
	line9 = "changes. You can also randomize lighting colours.";
	helpLayer.text(line9, offset + 10, offset + 290);
	
	line10 = "For each option, press ENTER when you are done " +
	"making changes and";
	helpLayer.text(line10, offset + 10, offset + 320);
	line11 = "want to stop, add something new, or choose a different option.";
	helpLayer.text(line11, offset + 10, offset + 335);
	
	line12 = "Have fun and get creative!";
	helpLayer.text(line12, offset + 10, offset + 365);
	
	line = "Press ENTER to exit help.";
	helpLayer.text(line, offset + 10, offset + 440);
}


/**
 * Main executing function with continuous logic. Displays all current layers 
 * and elements. Is called repeatedly and updates what is displayed based on
 * how the displayable elements change.
 */
function draw() {
 	// Clears the background on each frame to prevent duplicate texts
  	background(235, 219, 192);
	
	// Displays colour lighting layer
	image(gradientLayer, 0, 0);
	
	// Displays layer for line drawings
	image(drawingLayer, 0, 0);
	
	// If button for changing lighting is clicked
	if (changingGradient) {
		changeLighting();
		displayLighting();
	}
	
	// If button for randomizing lighting is clicked
	if (randomizeGradient) {
		randomizeLighting();
		displayLighting();
	}
  
	// Display each text object in array
	for (let text of texts) {
		// If the text has been added but not finalized, apply changes
		if (text.added && text.located && !text.done) {
			text.update();
		}
		
		// Displays the text
		text.display();
	}
		
	// When in drawing mode
	if (currentlyDrawing && mouseIsPressed) {
		// Doesn't count the button click as a drawing motion
		if (drawButtonClicked) {
			drawButtonClicked = false;
		} else {
			let strokeSize;
			if (strokeSliderVisible) {
				strokeSize = strokeSlider.value();
			} else { // Disregards if slider is not active
				strokeSize = 0;
			}

			// Gets colour from individual RGB values from sliders
			let col = color(redSlider.value(), greenSlider.value(), blueSlider.value());

			// Displays line with given attributes
			drawingLayer.strokeWeight(strokeSize);
			drawingLayer.stroke(col);
			drawingLayer.line(mouseX, mouseY, pmouseX, pmouseY);
		}
	}

	// Shows the help section. Displays on top of the canvas temporarily.
	if (helpVisible) {
		help();
	}
	
}


