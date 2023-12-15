

var ob = [];
let clicked = false;
//get excel data


const canvas = document.getElementById('myCanvas');
const addBtn = document.getElementById('submit');
const textarea = document.querySelector('textarea');

addBtn.addEventListener('click', Add);

document.getElementById('excelFileInput').addEventListener('change', handleFile);

//callback
 
   
    function Add(event) {
        event.preventDefault();
        let data = document.querySelector('textarea');
        let ahc = []
        if(data.value == ''){
            alert('May không nhập gì thì quay cái chóo gì ???');
        }
        else{
            ahc = data.value.split("\n");
        }
        
        let objectdata = []
        let sum = 0;

        try {
            ahc.map((item) => {
                sum++;
            })
            let per = 100/sum;
            ahc.map((item) => {
                let o = {
                    name: item.split('-')[0],
                    percent: per.toFixed(2)
                }
                sum += parseInt(item.split('-')[1])
                objectdata.push(o);
            })
        }
        catch (e) {
            alert('no data fill/ngu af huong dan the r van nhap sai');
        }
        wirteGraph(objectdata);
    }



async function handleFile(event) {
    let listah =[];
    try{
        document.querySelector('#showitemexcel ul').innerHTML=`
        <li style="
          justify-content: space-evenly;
          margin-top: 20px;
          background-color: rgb(82, 154, 255);
          height: 30px;
          align-items: center;
          font-size: 1.3em;
          font-weight: 700;
          font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
          ;">
          name / tên 
          <span style="color: black;">|</span>
          <p style="margin: 0;"> win percent / tỉ lệ thắng(x%)</p>
        </li>`;
    }
    catch(e){

    }
    const fileInput = event.target;
    const file = fileInput.files[0];
    const reader = new FileReader();

    
    await new Promise((resolve) => {
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Lấy danh sách tên sheet
            const sheetNames = workbook.SheetNames;

            // Lấy dữ liệu từ sheet đầu tiên
            const firstSheetName = sheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Chuyển đổi dữ liệu thành mảng đối tượng
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // In ra mảng dữ liệu
            if (listah.length > 0) {
                listah = [];
            }
            jsonData.map((item, index) => {
                listah.push({
                    name:item[0],
                    percent: (100/jsonData.length).toFixed(2)
                });
            });
            resolve(); // Resolve Promise khi việc đọc file hoàn tất
        };
        reader.readAsArrayBuffer(file);

    });

    wirteGraph(listah);
    
}
let lk = [];
//draw graphic and init wheel logic
let luckyfarEachItem = [];
function wirteGraph(objectdata){
    
    let listah = [];
    
    objectdata.map((item,index)=>{
        listah.push(item.name)
        console.log(item.name)
    })

    console.log(listah);

    //=Draw luky wheel by canvas=======================================================
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    console.log("canvas x , canvas y:" + width + "  " + height)
    //input number of member
    let members = listah.length;
    console.log("number of member " + members);

    //class object player
    class Member {
        constructor(sAng, eAng, color, text,percent) {
            this.sAng = sAng;
            this.eAng = eAng;
            this.color = color; // string
            this.text = text;
        }
        draw() {
            const centerIndex = (this.sAng + this.eAng) / 2

            const centerX = width / 2 + width / 2.5 * Math.cos(centerIndex);
            const centerY = height / 2 + height / 2.5 * Math.sin(centerIndex);
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.arc(width / 2, height / 2, width / 2, this.sAng, this.eAng, false);
            ctx.closePath();
            ctx.fillStyle = this.color; // Màu sắc của hình tròn
            ctx.fill();


            function mapValue(input) {
                if (input <= 50 && input >= 1) {
                    return 15 - 1.5 * input * (15 / 99);
                } else {
                    return 1;
                }
            }
            ctx.font = `${mapValue(members)}px Arial`; // Đặt kích thước font chữ
            ctx.fillStyle = 'black';

            // Đo chiều rộng của văn bản
            const textWidth = ctx.measureText(this.text).width;

            // Tính toán vị trí để đặt chữ ở trung tâm
            const textX = centerX - textWidth / 2;
            const textY = centerY;

            // Vẽ chữ ở vị trí đã tính toán
            ctx.fillText(this.text, textX, textY);

        }
    }
    //random color
    function ranColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let color = `rgb(${r},${g},${b})`;
        return (color);
    }

    // run main =====================================
    if (ob.length > 0) {
        ob = []
    }
    console.log(objectdata)
    let far = 2 * Math.PI / members;
    let sAngel = 0;
    let eAngel = far;
    for (let i = 1; i <= members; i++) {
        ob[i] = new Member(sAngel, eAngel, ranColor(), listah[i - 1]);
        ob[i].draw();
        sAngel += far;
        if (i < members) eAngel += far;
    }
    const ullist = document.querySelector('#showitemexcel ul');
    ullist.innerHTML = "";
    ullist.innerHTML = `
            <li style="
            justify-content: space-evenly;
            margin-top: 20px;
            background-color: rgb(82, 154, 255);
            height: 30px;
            align-items: center;
            font-size: 1.1em;
            font-weight: 700;
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
            ;">
            name / tên 
            <span style="color: black;">|</span>
            <p style="margin: 0;"> win percent / tỉ lệ thắng(x%)</p>
        </li>
    `
    
    for(let i=0;i<listah.length;i++){
        let name = document.createElement('li');
        name.style.backgroundColor = ob[i+1].color;
        name.innerHTML = `${listah[i]}`
        let percent = document.createElement('input')
        percent.setAttribute('type', 'text');
        percent.value = `${objectdata[i].percent}%`
        percent.setAttribute('disabled',"true");
        name.appendChild(percent)
        
        ullist.appendChild(name);
    }

    
}

//get rotated radian
const spinBtn = document.getElementById('spinbtn');
function getRotationRadians(element) {
    const matrix = window.getComputedStyle(element).getPropertyValue('transform');
    if (matrix === 'none') {
        return 0;
    }
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    const radians = Math.atan2(b, a);

    return radians;
}

//===============
var audio = new Audio("./sound.mp3"); 
const mute = document.getElementById('mute');
 let statemute = false;
mute.addEventListener('click',()=>{
    if(!statemute){
        audio = new Audio("./sound.mp3");
        mute.style.backgroundColor = "greenYellow";
        statemute=true;
    }
    else{
        audio = 0;
        mute.style.backgroundColor = "red";
        statemute = false;
    }
})

 let lucky =0;
spinBtn.addEventListener('click', () => {
    //test 
    clicked = true;
    try{
        audio.play();
    }
    catch(e){
        
    }
    let uprad = 3000 + Math.floor(Math.random()*5000);
    lucky += uprad;
    canvas.style.transform = `rotate(${lucky}deg)`
    spinBtn.style.display = 'none';

})

function getRotationRadians(element) {
    const matrix = window.getComputedStyle(element).getPropertyValue('transform');
    if (matrix === 'none') {
        return 0;
    }
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    const radians = Math.atan2(b, a);

    return radians;
}
canvas.addEventListener('transitionend',()=>{
    spinBtn.style.display = 'block';
    // Lấy và hiển thị góc quay
    const rotationRadians = getRotationRadians(canvas);
    console.log('Góc quay (radian):', rotationRadians);
    let d = 0;
    ob.map((item, index) => {
        if (Math.cos(rotationRadians + item.sAng) > Math.cos(Math.PI / 2) && Math.cos(rotationRadians + item.eAng) < Math.cos(Math.PI / 2)) {
            alert(item.text)
        }
        if (rotationRadians == 0) {
            console.log("thật không thể tin được ! ")
        }
    })
})