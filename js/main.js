// Variables
var date = new Date();
var hour = date.getHours();
var nightChecker = hour < 7 || hour >= 18;
var body;
var screenHeight, goToTopBttn;
var greetingWords;
var requestID;
var checkBox;


// When windows loaded, then run
window.onload = function () {
    // console.log("onload trigger");
    body = document.querySelector('body');
    screenHeight = document.getElementById('introSection').offsetHeight;
    goToTopBttn = document.getElementById('goToTop');
    greetingWords = document.getElementById('greeting');
    checkBox = document.querySelector('input[name=switch]');
    window.addEventListener('scroll', scrollDetect,false);
    goToTopBttn.addEventListener('click', scrollAction);
    checkBox.addEventListener('change',changeTheme);
    initialDarkThemeChecker();
    scrollDetect();
}

// change Theme
function changeTheme() {
    if(checkBox.checked){
        trans();
        greetingWords.innerHTML = 'good evening!';
        document.documentElement.setAttribute('data-theme', 'dark');
    }else{
        // console.log('light');
        trans();
        greetingWords.innerHTML = 'good morning!';
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Change Theme transition helper
function trans() {
    document.documentElement.classList.add('theme-transition');
    window.setTimeout(()=>{
        document.documentElement.classList.remove('theme-transition');
    },1000);
}

// Check current time to trigger the night mode
function initialDarkThemeChecker() {
    if (nightChecker) {
        checkBox.checked = true;
        changeTheme();
    }else{
        changeTheme();
    }
}

// Show and hide the goToTop button
function scrollDetect() {
    if (window.scrollY > screenHeight) {
        goToTopBttn.classList.add('show');
    } else {
        goToTopBttn.classList.remove('show');
    }
}

// GoToTop button function
function scrollAction() {
    if('scrollBehavior' in document.documentElement.style){
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }else{
        requestID = requestAnimationFrame(SmoothVerticalScrolling);
    }

}

// GoToTop function for Edge, Safari, etc
function SmoothVerticalScrolling() {
    var bodyTop = body.getBoundingClientRect().top;
    var moveSpeed = bodyTop / 10;
    window.scrollBy(0, moveSpeed);
    if(bodyTop != 0){
        requestID = requestAnimationFrame(SmoothVerticalScrolling);
    }else{
        cancelAnimationFrame(requestID);
    }
}

