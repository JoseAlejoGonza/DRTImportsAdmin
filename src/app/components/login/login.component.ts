import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BADLOGIN, BADPASS, BADUSR, SECRET_KEY, SUCCES } from '../../const/loginReq';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginSub: Subscription | undefined;
  messageUsrWrong: boolean = false;
  messagePassWrong: boolean = false;
  fullName: string = '';
  password: string = '';

  constructor(
    private dataService: DataServiceService,
    protected readonly router: Router,
    protected readonly route: ActivatedRoute
  ){}

  ngOnInit(): void { }

  encryptData(data: any, secretKey: string): string {
    const dataString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(dataString, secretKey).toString();
    return encrypted;
  }

  login(){
    const secretKey = SECRET_KEY;
    this.messageUsrWrong = false;
    this.messagePassWrong = false;
    let body = {
      "userName": this.fullName,
      "password": this.password
    };
    const encryptedData = this.encryptData(body, secretKey);
    this.loginSub = this.dataService.setLogin(encryptedData).subscribe({
      next: (data:any)=>{
        switch(data.body){
          case SUCCES:
            this.router.navigate(['home']);
            break;
          case BADUSR:
            this.password = "";
            this.messageUsrWrong = true;
            break;
          case BADPASS:
            this.password = "";
            this.messagePassWrong = true;
            break;
          case BADLOGIN:
            this.password = "";
            this.messageUsrWrong = true;
            this.messagePassWrong = true;
            break;
          default:
            this.password = "";
            this.messageUsrWrong = true;
            this.messagePassWrong = true;
            break;
        }
      },
      error: (err: any) =>{
        console.log(err);
      },
      complete:()=>{
        console.log('Complete');
      }
    })
  }

  ngOnDestroy():void{
    this.loginSub?.unsubscribe();
  }

}
