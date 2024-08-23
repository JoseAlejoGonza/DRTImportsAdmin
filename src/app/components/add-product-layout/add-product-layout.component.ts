import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-product-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './add-product-layout.component.html',
  styleUrl: './add-product-layout.component.scss'
})
export class AddProductLayoutComponent implements OnInit {
  currentStep: number = 1;

  constructor(){}

  ngOnInit(): void {
    
  }

  nextStep(step:number){
    console.log(step)
    this.currentStep = step+1;
  }
}
