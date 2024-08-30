import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faLessThan, faGreaterThan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProductServiceService } from '../../services/product-service.service';
import { Subscription } from 'rxjs';
import { CreateStepOneComponent } from '../products/create-step-one/create-step-one.component';
import { CategoryInfo } from '../../models/cotegoryInfo.model';
import { CreateStepTwoComponent } from '../products/create-step-two/create-step-two.component';

@Component({
  selector: 'app-add-product-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FontAwesomeModule, CreateStepOneComponent, CreateStepTwoComponent],
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
  catAndSubcatInfo: CategoryInfo | undefined;

  constructor(
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
      // this.prodsSub = this.productService.getCategory().subscribe({
      //   next: (data:any)=>{
      //     console.log(data);
      //     this.categories = data;
      //   },
      //   error: (err:any)=>{
      //     console.log(err);
      //   },
      //   complete:()=>{
      //     console.log("Complete");
      //   }
      // })
  }

  nextStep(step:number){
    this.currentStep = step+1;
  }

  categoryInfo(info:CategoryInfo){
    this.catAndSubcatInfo = info;
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
