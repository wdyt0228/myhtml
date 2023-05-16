// music.js 파일 내부
// btn2를 누르면
// transform: translate(-100vw);

document.querySelector('.btn1').addEventListener('click',function(){
    document.querySelector(".container").style.transform='translate(0)';
});

document.querySelector('.btn2').addEventListener('click',function(){
    document.querySelector(".container").style.transform='translate(-100vw)';
});

document.querySelector('.btn3').addEventListener('click',function(){
    document.querySelector(".container").style.transform='translate(-200vw)';
});