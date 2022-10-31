// notatnik z zajęć
// const main = document.querySelector('main')

// // const timeoutRef = setTimeout( 
// //     () => {
// //         main.innerHTML='From setTimeout'
// //     },
// //     2000
// // )
// let licznik = 0 
// const intervalRef = setInterval( 
//     () => {
//         main.innerHTML='From interval' + licznik++
//     },
//     4000
// )

// // kasujemy setInterval
// clearInterval(intervalRef)

// // kasujemy setTimeout
// clearTimeout(intervalRef)


// window.requestAnimationFrame

let slideIndex = 1;

function plusSlides(n) {
  showSlide(slideIndex += n);
}

function activeSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  let x;
  let slides = document.getElementsByClassName("slide");

  if (n > slides.length)
  {slideIndex = 1};
  if (n < 1) 
  {slideIndex = slides.length};

  for (x = 0; x < slides.length; x++) {
    slides[x].style.display = "none";
  };

  slides[slideIndex-1].style.display = "block";

}

showSlide(slideIndex);