

/*LOGIC:
the IntersectionObserver function is a built-in javascript function able to 
observe an element entering the viewport(start showing in the page). In this instance
it tracks when the hiddenElements(elements having the class hidden) enter the viewport,
when they do .classList.add() adds the class show to the element(the class show and hidden are defined
in the css file). does the same thing with line.

OUTPUT: 
when you load the page, elements start hidden and as you scroll they come into view
(the animation itself is defined in the css)*/ 


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            const line = entry.target.querySelector('.line');
            if (line) {
                line.classList.add('show'); // Add the `show` class to the `.line`
            }
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


/*LOGIC:
the updateLIneHeights function loops over every element of the 
boxes array(the line containers) and calculates the distance between the bottom 
of one line container from the top of the next line container. It then assigns that distance
to the line height, so they are the exact length to connenct the containers

OUTPUT:
ensures that the lines connecting the line containers are the exact length
of their distance, it also ensures responsiveness as it adapts to screen size changes*/

const boxes = document.querySelectorAll(".line");


const updateLineHeights = () => {
    boxes.forEach( (box, index ) => {
        if(index < boxes.length -1 ){
            const nextBox = boxes[index + 1];
            
            const boxBottom = box.getBoundingClientRect().bottom;
            const nextBoxTop = nextBox.getBoundingClientRect().top;

            const distance = nextBoxTop - boxBottom;
            box.style.setProperty('--line-height', `${distance}px`);
        }
    });
}

window.addEventListener('load', updateLineHeights);
window.addEventListener('resize', updateLineHeights);