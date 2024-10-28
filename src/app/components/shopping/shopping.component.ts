import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartPie, faCheck, faChevronDown, faChevronUp, faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductServiceService } from '../../services/product-service.service';
import { Subscription } from 'rxjs';
import { PendingPurchase, ProductsPurchase } from '../../models/purchase.model';
import { ERROR, UPDATE_FAILED, UPDATE_SUCCESFUL } from '../../const/constRequests';
import { DELIVERED, PREPARED, SEND } from '../../const/purchases';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms ease-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class ShoppingComponent implements OnInit {
  faChartPie = faChartPie;
  faXmark = faXmark;
  faCheck = faCheck;
  faCircleExclamation = faCircleExclamation;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  datePurchase: string = '';
  orderIdToModal: string = '';
  addressOrder: string = '';
  textNotification: string = '';
  styleModal: string = '';
  styleButtonCloseModal: string = '';

  idTransaction: number = 0;

  flagModal: boolean = false;
  notificationError: boolean = false;
  flagPendingPurchase: boolean = false;
  flagPendingPurchaseDelivered: boolean = false;
  flagHistoryPurchases: boolean = false;

  purchaseSub: Subscription | undefined;
  purchaseProdSub: Subscription | undefined;
  purchaseSendSub: Subscription | undefined;
  purchaseDeliveredSub: Subscription | undefined;
  purchaseHistorySub: Subscription | undefined;

  pendingPurchases: PendingPurchase[] | undefined;
  pendingPurchasesDelivered: PendingPurchase[] | undefined;
  pendingPurchasesHistory: PendingPurchase[] | undefined;
  pendingProductSend: ProductsPurchase[] | undefined;

  constructor(
    private productService: ProductServiceService
  ){ }

  ngOnInit(): void {
    this.getPurchasesPending();
  }

  openAccordion(){
    this.flagPendingPurchase = !this.flagPendingPurchase;
  }

  openAccordionDelivered(){
    this.flagPendingPurchaseDelivered = !this.flagPendingPurchaseDelivered;
  }

  openAccordionHistory(){
    this.flagHistoryPurchases = !this.flagHistoryPurchases;
  }

  getPurchasesPending(){
    let additionPurchases = 0;
    let additionPurchasesDelivered = 0;
    this.purchaseSub = this.productService.getPurchases().subscribe({
      next: (data:PendingPurchase[])=>{
        this.pendingPurchases = data;
        additionPurchases = data.length;
      },
      error: (err:any)=>{
        return;
      },
      complete:()=>{
        return;
      }
    });

    this.purchaseDeliveredSub = this.productService.getPurchasesDelivered().subscribe({
      next: (data:PendingPurchase[])=>{
        this.pendingPurchasesDelivered = data;
        additionPurchasesDelivered = data.length;
      },
      error: (err:any)=>{
        return;
      },
      complete:()=>{
        return;
      }
    });

    this.purchaseHistorySub = this.productService.getHistoryPurchases().subscribe({
      next: (data:PendingPurchase[])=>{
        this.pendingPurchasesHistory = data;
      },
      error: (err:any)=>{
        return;
      },
      complete:()=>{
        return;
      }
    });
    setTimeout(() => {
      this.productService.updateTotalPurchase(additionPurchases+additionPurchasesDelivered);
    },2000);
  }

  prepareOrder(idTrx:number){
    let productInfoToUpdate = {
      pId: idTrx,
      position_update: PREPARED
    };
    this.purchaseSendSub = this.productService.sendPurchase(productInfoToUpdate).subscribe({
      next:(data:any)=>{
        switch(data.body.messageRes){
          case UPDATE_SUCCESFUL:
            this.textNotification = 'El producto '+this.orderIdToModal+' se está preparando';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          case UPDATE_FAILED:
            this.textNotification = 'El producto '+this.orderIdToModal+'no se poner el preparación, por favor vuelva a intentarlo';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          case ERROR:
            this.textNotification = 'No se ha podido acceder para poner en prepapración, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          default:
            this.textNotification = 'Existe un error al intentar conectar con la base de datos, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
        }
      }
    });
  }
  
  openOrder(idTrx: number, orderId: string, address: string, isPrepared: number){
    this.idTransaction = idTrx;
    this.orderIdToModal = orderId;
    this.addressOrder = address;
    if(isPrepared === 0){
      this.prepareOrder(idTrx);
    }
    this.purchaseProdSub = this.productService.getDetailProducts(this.idTransaction).subscribe({
      next: (data:ProductsPurchase[])=>{
        this.pendingProductSend = data;
        this.flagModal = true;
      },
      error:(err:any)=>{
        return;
      },
      complete:()=>{
        return;
      }
    })
  }

  productIsDelivered(idTrx: number){
    let productInfoToUpdate = {
      pId: idTrx,
      position_update: DELIVERED
    };
    this.purchaseSendSub = this.productService.sendPurchase(productInfoToUpdate).subscribe({
      next:(data:any)=>{
        switch(data.body.messageRes){
          case UPDATE_SUCCESFUL:
            this.textNotification = 'El producto '+this.orderIdToModal+' se entregó correctamente';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          case UPDATE_FAILED:
            this.textNotification = 'El producto '+this.orderIdToModal+'no se pudo registrar correctamente como entregado, por favor vuelva a intentarlo';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          case ERROR:
            this.textNotification = 'No se ha podido acceder para registrar la entrega, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          default:
            this.textNotification = 'Existe un error al intentar conectar con la base de datos, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
        }
      }
    });
  }

  createDate(date: string){
    return new Date(date);
  }

  price(price: string){
    let totalPrice = parseFloat(price);
    return totalPrice;
  }

  completeOrder(idTrx:number){
    let productInfoToUpdate = {
      pId: idTrx,
      position_update: SEND
    };
    this.purchaseSendSub = this.productService.sendPurchase(productInfoToUpdate).subscribe({
      next:(data:any)=>{
        switch(data.body.messageRes){
          case UPDATE_SUCCESFUL:
            this.textNotification = 'El producto '+this.orderIdToModal+' se envió correctamente';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          case UPDATE_FAILED:
            this.textNotification = 'El producto '+this.orderIdToModal+'no se pudo registrar correctamente, por favor vuelva a intentarlo';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          case ERROR:
            this.textNotification = 'No se ha podido acceder para registrar la categoría, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
          default:
            this.textNotification = 'Existe un error al intentar conectar con la base de datos, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.getPurchasesPending();
            this.closeModal();
            this.notificationError = true;
            break;
        }
      }
    });
  }

  closeModal(){
    this.flagModal = false;
  }

  closeModalAlert(){
    this.notificationError = false;
  }

  ngOnDestroy(): void {
    this.purchaseSub?.unsubscribe();
    this.purchaseProdSub?.unsubscribe();
  }
}
