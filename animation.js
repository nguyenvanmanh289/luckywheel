const closetab = document.getElementById('closetab');
const openandclose  = document.getElementById('close');
const inputall = document.getElementById('inputall');
const addBtn1 = document.getElementById('submit');

addBtn1.addEventListener('click',()=>{
    let data = document.querySelector('textarea');
    if(data.value == ""){

    }
    else{
        close();
    }
    
})
closetab.addEventListener('click',close);
let stateopen = true; //opened
openandclose.addEventListener('click',()=>{
    if(stateopen){
        inputall.style.transition = "all 0.3s linear";
        close();
        stateopen = false;
    }
    else{
        inputall.style.top = '50px';
        inputall.style.left = "20px";
        inputall.style.display = "block";
        
        if(window.innerWidth<480){
            inputall.style.width = '100vw'
          }
          else{
            inputtall.style.width = "400px"
          }
        inputall.style.height = "auto";
        stateopen = true;
    }
})
function close(){
    inputall.style.top = '20px';
    inputall.style.left = "20px";
    inputall.style.width = "30px";
    inputall.style.height = "30px";
    setTimeout(()=>{
        inputall.style.display = "none";
    },500)
}