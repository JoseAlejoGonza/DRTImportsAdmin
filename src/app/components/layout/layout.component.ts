import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MENU } from '../../const/menuOptions';
import { Menu } from '../../models/menu.model';
import { ProductServiceService } from '../../services/product-service.service';
import { Subscription } from 'rxjs';
import { PendingPurchase } from '../../models/purchase.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  totalPendingPurchases: number = 0;
  menuOptions: Menu[] = MENU;

  purchaseSub: Subscription | undefined;

  pendingPurchases: PendingPurchase[] | undefined;

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
    this.purchaseSub = this.productService.totalPurchases$.subscribe((items)=>{
      this.totalPendingPurchases = items;
    })
  }

  ngOnDestroy(): void {
    this.purchaseSub?.unsubscribe();
  }
}
