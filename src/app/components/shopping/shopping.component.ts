import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent {
  faChartPie = faChartPie;
}
