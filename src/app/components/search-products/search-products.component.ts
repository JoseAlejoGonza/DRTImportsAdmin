import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Subscription } from 'rxjs';
import { faCircleExclamation, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ProductToEdit } from '../../models/productInfo.model';
import { ERROR, UPDATE_FAILED, UPDATE_SUCCESFUL } from '../../const/constRequests';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent implements OnInit{

  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  faCircleExclamation = faCircleExclamation;

  productsArray: Array<any> = [];
  filteredProducts: Array<any> = [];
  productSub: Subscription | undefined;
  editProductSub: Subscription | undefined;

  classLabel: string = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  classInput: string = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  searchInfo: string = '';
  productName: string | undefined;
  productDescription: string | undefined;
  principalImage: string | undefined;
  twoImage: string | undefined;
  threeImage: string | undefined;
  fourImage: string | undefined;
  fiveImage: string | undefined;
  textNotification: string = '';
  styleModal: string = '';
  styleButtonCloseModal: string = '';

  // numbers  
  productPrice: number | undefined;
  productQuantity: number | undefined;
  productPercent: number | undefined;
  productCodeBar: number | undefined;

  flagModal: boolean = false;
  nameInput: boolean = false;
  descriptionInput: boolean = false;
  quantityInput: boolean = false;
  priceInput: boolean = false;
  percentInput: boolean = false;
  principalImageInput: boolean = false;
  twoImageInput: boolean = false;
  threeImageInput: boolean = false;
  fourImageInput: boolean = false;
  fiveImageInput: boolean = false;
  notificationError:boolean = false;

  productToEdit: ProductToEdit | undefined;
  
  constructor(
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
    this.loadInfoTable();
  }

  loadInfoTable(){
    this.productSub = this.productService.getProduct().subscribe({
      next: (data:any)=>{
        this.productsArray = data;
        this.filteredProducts = [...this.productsArray];
      },
      error: (err:any)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Complete");
      }
    })
  }

  searchProduct(){
    if(this.searchInfo !== ''){
      this.filteredProducts = this.productsArray.filter(product =>
        product.product_name.toLowerCase().includes(this.searchInfo) ||
        product.product_description.toLowerCase().includes(this.searchInfo) ||
        product.sub_category_name.toLowerCase().includes(this.searchInfo)
      )
    }else{
      this.filteredProducts = [...this.productsArray];
    }
  }

  searchCodeBar(){
    if(this.productCodeBar === null || this.productCodeBar === undefined){
      this.filteredProducts = [...this.productsArray];
    }else{
      this.filteredProducts = this.productsArray.filter(product =>
        product.bar_code.toString().includes(this.productCodeBar)
      )
    }
  }

  openModal(prod:any){
    this.productToEdit = prod;
    
    let arrayImages = this.productToEdit?.images?.split(',');
    this.productName = this.productToEdit?.product_name;
    this.productDescription = this.productToEdit?.product_description;
    this.principalImage = arrayImages ? arrayImages[0]:'';
    this.twoImage = arrayImages ? arrayImages[1]:'';
    this.threeImage = arrayImages ? arrayImages[2]:'';
    this.fourImage = arrayImages ? arrayImages[3]:'';
    this.fiveImage = arrayImages ? arrayImages[4]:'';
    this.productQuantity = this.productToEdit?.total_quantity;
    this.productPrice = parseFloat(this.productToEdit?.regular_price ? this.productToEdit?.regular_price : '0');
    this.productPercent = this.productToEdit?.discount;

    this.flagModal = true;
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

  closeModal(){
    this.flagModal = false;
  }

  closeModalAlert(){
    this.notificationError = false;
  }

  saveChanges(){
    let arrayImagesId = this.productToEdit?.imagesId?.split(',');

    let productInfoToUpdate = {
      pId: this.productToEdit?.product_id,
      pPriceId: this.productToEdit?.price_id,
      pName: this.productName,
      pDesc: this.productDescription,
      pQantity: this.productQuantity,
      pPrice: this.productPrice,
      pPercent: this.productPercent,
      imgUrls: [
        this.principalImage,
        this.twoImage,
        this.threeImage,
        this.fourImage,
        this.fiveImage
      ],
      imgIds: [
        parseInt(arrayImagesId ? arrayImagesId[0]:'0'),
        parseInt(arrayImagesId ? arrayImagesId[1]:'0'),
        parseInt(arrayImagesId ? arrayImagesId[2]:'0'),
        parseInt(arrayImagesId ? arrayImagesId[3]:'0'),
        parseInt(arrayImagesId ? arrayImagesId[4]:'0')
      ],
    };
    this.editProductSub = this.productService.editProduct(productInfoToUpdate).subscribe({
      next: (data:any)=>{
        switch(data.body.messageRes){
          case UPDATE_SUCCESFUL:
            this.textNotification = 'El producto '+productInfoToUpdate?.pName+' se modificó correctamente';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.closeModal();
            this.loadInfoTable();
            this.notificationError = true;
            break;
          case UPDATE_FAILED:
            this.textNotification = 'El producto '+productInfoToUpdate?.pName+'no se pudo registrar correctamente, por favor vuelva a intentarlo';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.closeModal();
            this.loadInfoTable();
            this.notificationError = true;
            break;
          case ERROR:
            this.textNotification = 'No se ha podido acceder para registrar la categoría, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.closeModal();
            this.loadInfoTable();
            this.notificationError = true;
            break;
          default:
            this.textNotification = 'Existe un error al intentar conectar con la base de datos, por favor contacte con soporte';
            this.styleModal = 'flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
            this.closeModal();
            this.loadInfoTable();
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

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.editProductSub?.unsubscribe();
  }
}
