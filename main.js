setTimeout(()=>{
  alert(' Hãy nhập dữ liệu cho lần đầu ! 🤩✌️');
},300) 

const inputtall = document.getElementById('inputall');
let initialmouseX;
let initialmouseY;
let state = false;
const canvas1 = document.querySelector('canvas');
const arrow = document.getElementById('arrow');

if(window.innerWidth<480){
  canvas1.setAttribute('height',`${window.innerWidth-30}`);
  canvas1.setAttribute('width',`${window.innerWidth-30}`)
}
else{
  inputtall.style.width = "400px"
  canvas1.setAttribute('height',`${window.innerHeight*6/10}`);
  canvas1.setAttribute('width',`${window.innerHeight*6/10}`)
}

arrow.style.top = `${canvas1.getBoundingClientRect().top + canvas1.clientHeight*7.3/10}px`;


inputtall.addEventListener('mousedown', (event) => {
    inputtall.style.border = "2px solid blue";
    initialmouseX = event.offsetX;
    initialmouseY = event.offsetY;
   
    state = true;
});

inputtall.addEventListener('mouseup',()=>{
  state = false;
  inputtall.style.border = "none"
})

window.addEventListener('dblclick',()=>{
    state = false;
})
document.addEventListener('mousemove', (event) => {
  if(state){
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    
      inputtall.style.left = `${mouseX-initialmouseX}px`;
      inputtall.style.top = `${mouseY-initialmouseY}px`;
     
    }
   
});


let touchX;
let touchY;

document.addEventListener('touchmove', (event) => {
  inputtall.style.transition = "none";
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
  
});

let initialTouchX;
let initialTouchY;

inputtall.addEventListener('touchstart', (event) => {
    // Lấy tọa độ của điểm chạm đầu tiên trong phần tử
    initialTouchX = event.touches[0].clientX - inputtall.getBoundingClientRect().left;
    initialTouchY = event.touches[0].clientY - inputtall.getBoundingClientRect().top;
inputtall.style.position = "absolute";
    // Các xử lý khác (nếu cần)
});

inputtall.addEventListener('touchmove', () => {
  
    inputtall.style.left = `${touchX-initialTouchX}px`;
    inputtall.style.top = `${touchY -initialTouchY}px`;
});

inputtall.addEventListener('touchend', () => {
    inputtall.style.border = "none";
});
