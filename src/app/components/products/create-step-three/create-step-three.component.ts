import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductInfo } from '../../../models/productInfo.model';
import { faCircleExclamation, faLessThan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProductServiceService } from '../../../services/product-service.service';
import { ERROR, INSERT_FAILED, INSERT_SUCCESFUL, PRODUCT_EXIST } from '../../../const/constRequests';

@Component({
  selector: 'app-create-step-three',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './create-step-three.component.html',
  styleUrl: './create-step-three.component.scss'
})
export class CreateStepThreeComponent implements OnInit{
  @Input() step: number=0;
  @Input() productInfo: ProductInfo | undefined;

  @Output() prevStep: EventEmitter<number> = new EventEmitter();
  @Output() goToFirstStep: EventEmitter<number> = new EventEmitter();
  @Output() infoToEdit: EventEmitter<ProductInfo> = new EventEmitter();

  createProductSub: Subscription | undefined;

  // Icons
  faLessThan = faLessThan;
  faCircleExclamation = faCircleExclamation;
  faXmark = faXmark;

  // strings
  classLabel: string = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  classInput: string = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  productName: string | undefined;
  productDescription: string | undefined;
  productSlug: string | undefined;
  principalImage: string | undefined;
  twoImage: string | undefined;
  threeImage: string | undefined;
  fourImage: string | undefined;
  fiveImage: string | undefined;
  productSubcategeory: string | undefined;
  productCategory: string | undefined;
  styleModal: string = '';
  styleButtonCloseModal: string = '';
  textNotification: string = '';

  // numbers  
  productCodeBar: number | undefined;
  productQuantity: number | undefined;
  productPrice: number | undefined;
  productPercent: number | undefined;

  isSaved:boolean = false;
  notificationError:boolean = false;
  contentFlag:boolean = true;


  constructor(
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
    // this.productInfo = {
    //   "pName": "mouse vertical",
    //   "pDesc": "mouse inhalambrico recargable",
    //   "pSlug": "mouse-vertical-inhalambrico-recargable",
    //   "pCodeBar": 123456789,
    //   "pQantity": 6,
    //   "pPrice": 60000,
    //   "pPercent": 0,
    //   "pPrincipalImage": "miprimerafotito",
    //   "pOtherUrls": [
    //       "misegundafotito",
    //       "mitercerafotito",
    //       "micuartafotito",
    //       "miquintafotito"
    //   ],
    //   "pCategoryInfo": {
    //       "id": 1,
    //       "sub_category_name": "Audífonos",
    //       "category_id": 1,
    //       "category_name": "Tecnología"
    //   }
    // }
    this.productName = this.productInfo?.pName;
    this.productDescription = this.productInfo?.pDesc;
    this.productSlug = this.productInfo?.pSlug;
    this.principalImage = this.productInfo?.pPrincipalImage;
    this.twoImage = this.productInfo?.pOtherUrls[0];
    this.threeImage = this.productInfo?.pOtherUrls[1];
    this.fourImage = this.productInfo?.pOtherUrls[2];
    this.fiveImage = this.productInfo?.pOtherUrls[3];
    this.productCodeBar = this.productInfo?.pCodeBar;
    this.productQuantity = this.productInfo?.pQantity;
    this.productPrice = this.productInfo?.pPrice;
    this.productPercent = this.productInfo?.pPercent;
    this.productCategory = this.productInfo?.pCategoryInfo?.category_name;
    this.productSubcategeory = this.productInfo?.pCategoryInfo?.sub_category_name;
  }

  prev(){
    this.prevStep.emit(this.step);
    this.infoToEdit.emit(this.productInfo);
  }

  saveProduct(){
    this.createProductSub = this.productService.setProduct(this.productInfo).subscribe({
      next: (data:any)=>{
        switch(data.body.messageRes){
          case INSERT_SUCCESFUL:
            this.textNotification = 'El producto '+this.productInfo?.pName+' se agregó correctamente';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.contentFlag = false;
            this.notificationError = true;
            this.isSaved = true;
            break;
          case PRODUCT_EXIST:
            this.textNotification = 'El producto '+this.productInfo?.pName+' ya existe, por favor cambie el nombre del producto o modifique el producto ya existente desde'+
            ' la opción de Consultar Produtos.';
            this.styleModal = 'flex items-center p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700'
            this.notificationError = true;
            break;
          case INSERT_FAILED:
            this.textNotification = 'El producto '+this.productInfo?.pName+'no se pudo registrar correctamente, por favor vuelva a intentarlo';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.notificationError = true;
            break;
          case ERROR:
            this.textNotification = 'No se ha podido acceder para registrar la categoría, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.notificationError = true;
            break;
          default:
            this.textNotification = 'Existe un error al intentar conectar con la base de datos, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.notificationError = true;
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

  closeModal(){
    this.notificationError = false;
  }

  goFirstStep(){
    this.goToFirstStep.emit(0);
  }
}
