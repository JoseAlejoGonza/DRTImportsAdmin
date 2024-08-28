import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faLessThan, faGreaterThan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProductServiceService } from '../../services/product-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FontAwesomeModule],
  templateUrl: './add-product-layout.component.html',
  styleUrl: './add-product-layout.component.scss'
})
export class AddProductLayoutComponent implements OnInit {
  faCircleCheck:IconDefinition = faCircleCheck;
  faLessThan:IconDefinition = faLessThan;
  faGreaterThan:IconDefinition = faGreaterThan;
  prodsSub: Subscription | undefined;
  isSaved: boolean = false;
  currentStep: number = 1;
  categories:Array<any> = [];

  constructor(
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
      this.prodsSub = this.productService.getCategory().subscribe({
        next: (data:any)=>{
          console.log(data);
          this.categories = data;
        },
        error: (err:any)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("Complete");
        }
      })
  }

  nextStep(step:number){
    console.log(step)
    this.currentStep = step+1;
  }

  prevStep(step:number){
    console.log(step)
    if(step == 3){
      this.isSaved = false;
    }
    this.currentStep = step-1;
  }

  saveProduct(step:number){
    console.log(step)
    this.isSaved = true;
  }

  goFirstStep(){
    this.currentStep = 1;
    this.isSaved = false;
  }
}
