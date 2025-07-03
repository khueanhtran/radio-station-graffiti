# M9: Another Kind of CC

# Radio Station Wall Graffiti Maker


## Overview

This casual creator allows user to draw up their own graffiti wall that
resembles the aesthetic of a college radio station. The program presents a
blank canvas wall that the user can add text and drawings to. The program 
provides the ability to change the colours for both textual and visual 
components, as well as font size and font type for the text and storke size
for the drawings. There is also a "lighting" option that lets users play around
with different colour gradients for the canvas. This mimics the experience of
mood lighting in college radio stations, which casts onto the walls and creates
beautiful colour schemes. 

The program engages the user by allowing for decent range of flexibility and
freedom in how the user would like to design their graffiti wall. There is a
lot of user control in the positioning and content of different elements. The
lighting option in particular is a fun and potentially unexpected feature of
the program. The colours in the gradient shift in non-regular ways as the user 
moves the mouse, which offers an exciting and interactive means of engaging
with the design process.

Since the program offers much independence to the user in the creation process,
this lends the user to feel a sense of ownership over their work. While there
are implementations in the program that are meant to help the user, such as the
sliders to control different characteristics of the graffitis, it is very
free form and thus the design is almost completely up to the user (with perhaps
the exception of the font types available for texts). Furthermore, the lighting
option provides an easy way of improving the aesthetics of the design while
still letting the user be part of the process, which increases the likelihood
of the user enjoying what they have made.


## Personal Connection

This project is inspired by something very near and dear to me. WBOR is 
Bowdoin's radio station, which I have been involved with since the beginning of
my sophomore year. The radio station has been located in the basement of Dudley
Coe since 1995, but at the very beginning of 2025/spring semester, the station
will be relocating to Coles Tower due to the impending demolition of Dudley Coe. 
The station has an amazing aesthetic that wows anyone who comes in. There are 
countless writings, drawings, other forms of artistic expression all over the 
walls, ceilings, and furnitures of the station that have been added by 
occupants of the station for the past 30 years. It is an organically and 
eclectically developed space that truly embodies free spirit and a love for the 
arts. The WBOR station at Dudley Coe has been my favourite physical space on
campus, and it is a deeply bittersweet feeling to have to say goodbye to this
space. Through this project, I hope to partially recreate the experience of
adding your own marks to the walls of Dudley Coe and viewing all these
graffitis under the colourful lights in the station.

![WBOR Station at Dudley Coe](media/IMG_1492.jpg)

![WBOR Station at Dudley Coe](media/IMG_1493.jpg)

<video src="media/IMG_1434.mp4" width="640" height="480" controls></video>


## Challenges

The biggest challenge of this project for me was probably my lack of experience 
with Processing. I chose to work with p5.js for the project, because I am still
rather unfamiliar with Javascript and I wanted to have some more practice with
it. It took some time to get more used to the syntax, and I also initially
struggled with the control flow, since a lot of times multiple blocks of code
are being run simultaneously rather than sequentially. This pushed me to think
about the structure of my code, leading me to implement things like boolean 
flags for different functions, which is a bit different in execution than I am
used to with Python or Java. Additionally, it was a trial and error process to
figure out how I wanted to do the colour changing for my "lighting" gradient.
I wanted to have some flow to the way the colour gradients shifted, and I 
wanted to incorporate the movement of the user's mouse. It took a few different
configurations to come up with something that feels somewhat seamless and that
actually moves around different colours rather than getting stuck in one spot,
but I feel quite content about how this feature came out.


## Bugs

None detected.


## Credits

I looked at a lot of resources online for p5.js while working on my project.
Some tutorials/examples that were particularly helpful include:
- https://processing.org/examples/lineargradient.html
- https://processing.org/examples/continuouslines.html
- https://p5js.org/tutorials/loading-and-selecting-fonts/
- https://editor.p5js.org/jhedberg/sketches/rk8ydh6s7

I also referenced the p5js.org website extensively for documentations on the 
usage of various functions.