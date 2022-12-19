import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Register/Register.component';
import { LoginComponent } from './Login/Login.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './PageNotFound/PageNotFound.component';
@NgModule({
  //属于本 NgModule 的组件、指令、管道
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent, MainComponent, PageNotFoundComponent

  ],
  //那些导出了本模块中的组件模板所需的类的其它模块
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  //service
  providers: [],
  //根组件
  bootstrap: [AppComponent]
})
export class AppModule { }
