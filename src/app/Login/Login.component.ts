import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  type: string = 'z';
  form: {'username':string , 'password':string} = {
    'username': '',
    'password': '',
  }
  changetxt(txt: string) {
    this.type = txt;
  }
  submit() {
    if (this.form.username == '' || this.form.password == '') {
      alert('请将数据填写完整')
    } else {
      fetch(`http://localhost:9000/login?phone=${this.form.username}&Password=${this.form.password}&types='${this.type == 'z' ? '' : 'ENGLISH'}'`, {
        method: 'get',
      }).then(response => response.json())//解析为可读数据
        .then(data => {
          if (data.code == '200') {
            alert(data.message)
            window.location.href = '/#/home'
          } else {
            alert(data.message)
          }
        })//执行结果是 resolve就调用then方法
        .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
    }
  }
  alertdata() {
    alert('待开发')
  }
}
