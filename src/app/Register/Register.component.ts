import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})


export class RegisterComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    setTimeout(function () {
      if ((<HTMLElement>document.getElementById("verifyCanvas")) != null) {
        verVal = drawCode();
        (<HTMLElement>document.getElementById("code_img")).onclick = function () {
          console.log('ccc')
          resetCode()
        }
      }
    }, 1000)

  }
  form: any = {
    'mobile': '',
    'txyzm': '',
    'dxyzm': '',
    'name': '',/* 昵称 */
    'pwd': '',/* 密码 */
    'surepwd': '',/* 确认密码 */
    'otherInfo':''
  }
  type = 'z'
  /* 步骤 */
  step = 1
  changetxt(txt: string) {
    this.type = txt;
  }
  next(sum: any) {
    if (sum == 2) {
      let mobilemsg = /^[1]+[3,4,5,6,7,8,9]+\d{9}$/;
      if (this.form.mobile == '' || this.form.txyzm == '' || this.form.dxyzm == '') {
        alert('请将数据填写完整')
      } else if (!mobilemsg.test(this.form.mobile)) {
        alert('手机号格式有误请重新输入')
      } else if (this.form.txyzm.toLowerCase() != str.toLowerCase()) {
        alert('图形验证码有误请重新输入')
      } else if (this.form.dxyzm != '123456') {
        alert('短信验证码有误请重新输入')
      } else {
        this.step = sum;
        console.log(this.step);
      }
    } else if(sum == 3){
      if (this.form.name == '' || this.form.pwd == '' || this.form.surepwd == '') {
        alert('请将数据填写完整')
      } else if (this.form.pwd != this.form.surepwd) {
        alert('密码和确认密码不一致')
      } else {
        this.step = sum;
        console.log(this.step);
      }
    }else{
      if(sum == 4){
        fetch(`http://localhost:9000/regiest?phone=${this.form.mobile}&userName=${this.form.name}&Password=${this.form.pwd}&otherInfo=${this.form.otherInfo}&types='${this.type == 'z' ? '' : 'ENGLISH'}'`, {
        method: 'get',
      }).then(response => response.json())//解析为可读数据
        .then(data => {
          if (data.code == '200') {
            alert(data.message)
            this.step = sum;
            console.log(this.step);
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 5000);
          } else {
            alert(data.message)
          }
        })//执行结果是 resolve就调用then方法
        .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
      }
      

    }

  }
  submit() {
    if (this.form.name == '' || this.form.pwd == '' || this.form.surepwd == '') {
      alert('请将数据填写完整')
    } else if (this.form.pwd != this.form.surepwd) {
      alert('密码和确认密码不一致')
    } else {
      fetch(`http://localhost:9000/regiest?phone=${this.form.mobile}&userName=${this.form.name}&Password=${this.form.pwd}&otherInfo=${this.form.otherInfo}&types='${this.type == 'z' ? '' : 'ENGLISH'}'`, {
        method: 'get',
      }).then(response => response.json())//解析为可读数据
        .then(data => {
          if (data.code == '200') {
            alert(data.message)
            window.location.href = '/#/login'
          } else {
            alert(data.message)
          }
        })//执行结果是 resolve就调用then方法
        .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
    }
  }
}

function request(){
  
}
let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
let str = '';
let verVal = '';

// 绘制验证码
function drawCode() {
  let canvas: any = (<HTMLElement>document.getElementById("verifyCanvas")); //获取HTML端画布
  let context = canvas.getContext("2d"); //获取画布2D上下文
  context.fillStyle = "cornflowerblue"; //画布填充色
  context.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight); //清空画布
  context.fillStyle = "white"; //设置字体颜色
  context.font = "25px Arial"; //设置字体
  let rand = new Array();
  let x = new Array();
  let y = new Array();
  for (let i = 0; i < 4; i++) {
    rand.push(rand[i]);
    rand[i] = nums[Math.floor(Math.random() * nums.length)]
    x[i] = i * 20 + 10;
    y[i] = Math.random() * 20 + 20;
    context.fillText(rand[i], x[i], y[i]);
  }
  str = rand.join('').toUpperCase();
  console.log(str)
  //画3条随机线
  for (let i = 0; i < 3; i++) {
    drawline(canvas, context);
  }

  // 画30个随机点
  for (let i = 0; i < 30; i++) {
    drawDot(canvas, context);
  }
  convertCanvasToImage(canvas);
  return str;
}

// 随机线
function drawline(canvas: any, context: { moveTo: (arg0: number, arg1: number) => void; lineTo: (arg0: number, arg1: number) => void; lineWidth: number; strokeStyle: string; stroke: () => void; }) {
  context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
  context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
  context.lineWidth = 0.5; //随机线宽
  context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
  context.stroke(); //描边，即起点描到终点
}
// 随机点(所谓画点其实就是画1px像素的线)
function drawDot(canvas: any, context: { moveTo: (arg0: number, arg1: number) => void; lineTo: (arg0: number, arg1: number) => void; lineWidth: number; stroke: () => void; }) {
  let px = Math.floor(Math.random() * canvas.width);
  let py = Math.floor(Math.random() * canvas.height);
  context.moveTo(px, py);
  context.lineTo(px + 1, py + 1);
  context.lineWidth = 0.2;
  context.stroke();

}
// 绘制图片
function convertCanvasToImage(canvas: any) {
  (<HTMLElement>document.getElementById("verifyCanvas")).style.display = "none";
  let image: any = document.getElementById("code_img");
  image.src = canvas.toDataURL("image/png");
  return image;
}

// 点击图片刷新
// if ((<HTMLElement>document.getElementById("code_img"))) {
//   (<HTMLElement>document.getElementById("code_img")).onclick = function () {
//     console.log('ccc')
//     resetCode();
//   }
// }
function changepage() {
  resetCode();
}

function resetCode() {

  // $('#verifyCanvas').remove();
  (<HTMLElement>document.getElementById("verificationCode")).innerHTML = `<canvas width="100" height="40" id="verifyCanvas"></canvas>
          <img id="code_img">`
  verVal = drawCode();
  (<HTMLElement>document.getElementById("code_img")).onclick = function () {
    // console.log('ccc')
    resetCode();
    // console.log(str)
  }
}