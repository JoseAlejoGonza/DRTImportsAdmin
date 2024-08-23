import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  usersSub: Subscription | undefined;
  usersArray: Array<any> = [];

  constructor(
    private dataService: DataServiceService
  ){

  }

  ngOnInit(): void {
    this.usersSub = this.dataService.getUsers().subscribe({
      next: (data:any)=>{
        console.log(data);
        this.usersArray = data;
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
    this.usersSub?.unsubscribe();
  }
}
