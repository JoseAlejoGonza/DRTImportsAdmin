import { Component, Input, OnInit } from '@angular/core';
import { CategoryInfo } from '../../../models/cotegoryInfo.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-step-two',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './create-step-two.component.html',
  styleUrl: './create-step-two.component.scss'
})
export class CreateStepTwoComponent implements OnInit {
  @Input() step:number=0;
  @Input() categoryInfo:CategoryInfo | undefined;

  faLessThan = faLessThan;
  faGreaterThan = faGreaterThan;

  classLabel: string = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  classInput: string = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  productName: string = '';
  productDescription: string = '';
  productSlug: string = '';
  
  productCodeBar: number | undefined;
  productQuantity: number | undefined;
  productPrice: number | undefined;
  productPercent: number | undefined;

  nameInput:boolean = false;
  descriptionInput:boolean = false;

  constructor(){ }

  ngOnInit(): void {
    console.log(this.categoryInfo);
    console.log(this.step);
  }

  onDescriptionNameChange(){}

  onProductNameChange(){}

  prevStep(){}

  nextStep(){}
}
