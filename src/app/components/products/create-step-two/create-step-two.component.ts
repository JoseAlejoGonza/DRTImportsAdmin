import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryInfo } from '../../../models/cotegoryInfo.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation, faGreaterThan, faLessThan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInfo } from '../../../models/productInfo.model';
import { ProductServiceService } from '../../../services/product-service.service';
import { Subscription } from 'rxjs';

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
  @Input() productInfoToEdit:ProductInfo | undefined;

  @Output() nextStep: EventEmitter<number> = new EventEmitter();
  @Output() prevStep: EventEmitter<number> = new EventEmitter();
  @Output() productInfo: EventEmitter<ProductInfo> = new EventEmitter();

  subProductCodeBar: Subscription | undefined;

  // Icons
  faLessThan = faLessThan;
  faGreaterThan = faGreaterThan;
  faXmark = faXmark;
  faCircleExclamation = faCircleExclamation;

  // strings
  classLabel: string = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  classInput: string = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  productName: string = '';
  productDescription: string = '';
  productSlug: string = '';
  principalImage: string = '';
  twoImage: string = '';
  threeImage: string = '';
  fourImage: string = '';
  fiveImage: string = '';
  textNotification: string = '';
  styleModal: string = '';
  styleButtonCloseModal: string = '';

  // numbers  
  productCodeBar: number | undefined;
  productQuantity: number | undefined;
  productPrice: number | undefined;
  productPercent: number | undefined;

  // booleans
  nameInput: boolean = false;
  descriptionInput: boolean = false;
  slugInput: boolean = false;
  codeBarInput: boolean = false;
  quantityInput: boolean = false;
  priceInput: boolean = false;
  percentInput: boolean = false;
  principalImageInput: boolean = false;
  twoImageInput: boolean = false;
  threeImageInput: boolean = false;
  fourImageInput: boolean = false;
  fiveImageInput: boolean = false;
  notificationError:boolean = false;
  codeBarInputExist:boolean = false;

  // others
  productInfoToNextStep: ProductInfo | undefined;

  constructor(
    private productService: ProductServiceService
  ){ }

  ngOnInit(): void {
    if(this.productInfoToEdit){
      this.productName = this.productInfoToEdit?.pName;
      this.productDescription = this.productInfoToEdit?.pDesc;
      this.productSlug = this.productInfoToEdit?.pSlug;
      this.principalImage = this.productInfoToEdit?.pPrincipalImage;
      this.twoImage = this.productInfoToEdit?.pOtherUrls[0];
      this.threeImage = this.productInfoToEdit?.pOtherUrls[1];
      this.fourImage = this.productInfoToEdit?.pOtherUrls[2];
      this.fiveImage = this.productInfoToEdit?.pOtherUrls[3];
      this.productCodeBar = this.productInfoToEdit?.pCodeBar;
      this.productQuantity = this.productInfoToEdit?.pQantity;
      this.productPrice = this.productInfoToEdit?.pPrice;
      this.productPercent = this.productInfoToEdit?.pPercent;
    }
  }

  onNameChange(){
    if(this.productName !== ''){
      this.nameInput = false;
    }else{
      this.nameInput = true;
    }
  }
  onDescriptionChange(){
    if(this.productDescription !== ''){
      this.descriptionInput = false;
    }else{
      this.descriptionInput = true;
    }
  }
  onSlugChange(){
    if(this.productSlug !== ''){
      this.slugInput = false;
    }else{
      this.slugInput = true;
    }
  }
  onCodeBarChange(){
    if(this.productCodeBar === null || this.productCodeBar === undefined){
      this.codeBarInput = true;
    }else{
      this.codeBarInputExist = false;
      this.codeBarInput = false;
    }
  }
  onQuantityChange(){
    if(this.productQuantity === null || this.productQuantity=== undefined){
      this.quantityInput = true;
    }else{
      this.quantityInput = false;
    }
  }
  onPriceChange(){
    if(this.productPrice === null || this.productPrice=== undefined){
      this.priceInput = true;
    }else{
      this.priceInput = false;
    }
  }
  onPercentChange(){
    if(this.productPercent === null || this.productPercent=== undefined){
      this.percentInput = true;
    }else{
      this.percentInput = false;
    }
  }
  onPrincipalImageChange(){
    if(this.principalImage !== ''){
      this.principalImageInput = false;
    }else{
      this.principalImageInput = true;
    }
  }
  onTwoImageChange(){
    if(this.twoImage !== ''){
      this.twoImageInput = false;
    }else{
      this.twoImageInput = true;
    }
  }
  onThreeImageChange(){
    if(this.threeImage !== ''){
      this.threeImageInput = false;
    }else{
      this.threeImageInput = true;
    }
  }
  onFourImageChange(){
    if(this.fourImage !== ''){
      this.fourImageInput = false;
    }else{
      this.fourImageInput = true;
    }
  }
  onFiveImageChange(){
    if(this.fiveImage !== ''){
      this.fiveImageInput = false;
    }else{
      this.fiveImageInput = true;
    }
  }

  prev(){
    this.prevStep.emit(this.step);
  }

  next(){
    this.notificationError = false;
    this.onNameChange();
    this.onDescriptionChange();
    this.onSlugChange();
    this.onCodeBarChange();
    this.onQuantityChange();
    this.onPriceChange();
    this.onPercentChange();
    this.onPrincipalImageChange();
    this.onTwoImageChange();
    this.onThreeImageChange();
    this.onFourImageChange();
    this.onFiveImageChange();
    if(this.nameInput === true ||
      this.descriptionInput === true ||
      this.slugInput === true ||
      this.codeBarInput === true ||
      this.quantityInput === true ||
      this.priceInput === true ||
      this.percentInput === true ||
      this.principalImageInput === true ||
      this.twoImageInput === true ||
      this.threeImageInput === true ||
      this.fourImageInput === true ||
      this.fiveImageInput === true
    ){
      return;
    }else{
      this.productInfoToNextStep = {
        pName: this.productName,
        pDesc: this.productDescription,
        pSlug: this.productSlug,
        pCodeBar: this.productCodeBar,
        pQantity: this.productQuantity,
        pPrice: this.productPrice,
        pPercent: this.productPercent,
        pPrincipalImage: this.principalImage,
        pOtherUrls: [
          this.twoImage,
          this.threeImage,
          this.fourImage,
          this.fiveImage
        ],
        pCategoryInfo: this.categoryInfo
      };
      this.subProductCodeBar = this.productService.getProductCodeBar(this.productCodeBar || 0).subscribe({
        next: (data:any)=>{
          this.textNotification = 'El código de barras '+this.productCodeBar+' ya existe, está asociado al producto "'+data.name+
          '" y actualmente existen '+data.total_quantity+' unidades. Por favor cambie el código de barras o modifique el producto ya existente desde'+
          ' la opción de Consultar Produtos.';
          this.styleModal = 'flex items-center p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800';
          this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700'
          this.codeBarInputExist = true;
          this.notificationError = true;
        },
        error: (err:any)=>{
          if(err.status === 404){
            this.productInfo.emit(this.productInfoToNextStep);
            this.nextStep.emit(this.step);
          }else{
            return;
          }
        },
        complete:()=>{
          console.log("Complete");
        }
      })
    }
  }

  closeModal(){
    this.notificationError = false;
  }

  ngOnDestroy(): void {
    this.subProductCodeBar?.unsubscribe();
  }
}
