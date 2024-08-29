import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGreaterThan, faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ProductServiceService } from '../../../services/product-service.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CATEGORY_EXIST, ERROR, INSERT_FAILED, INSERT_SUCCESFUL } from '../../../const/categoryReq';

@Component({
  selector: 'app-create-step-one',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './create-step-one.component.html',
  styleUrl: './create-step-one.component.scss'
})
export class CreateStepOneComponent implements OnInit {
  @Input() step:number=0;
  @Output() nextStep: EventEmitter<number> = new EventEmitter();

  faGreaterThan = faGreaterThan;
  faXmark = faXmark;
  faCircleExclamation = faCircleExclamation;

  categorySub: Subscription | undefined;
  subcategorySub: Subscription | undefined;
  createCategroySub: Subscription | undefined;

  categoryName: string = '';
  textNotification: string = '';
  styleModal: string = '';
  styleButtonCloseModal: string = '';
  categories:Array<any> = [];
  subcategories:Array<any> = [];
  flagDisabled: boolean = true;
  flagDisabledButton:boolean = true;
  categoryInput:boolean = false;
  newCategoryInput:boolean = false;
  notificationError:boolean = false;
  categoryId:any|undefined;
  subcategoryId:any|undefined;

  constructor(
    private productService: ProductServiceService
  ){ }

  ngOnInit(): void {
    this.categorySub = this.productService.getCategory().subscribe({
      next: (data:any)=>{
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

  onCategoryNameChange(){
    this.categoryInput = false;
  }

  next(){
    if(this.categoryName == '' && this.categoryId == 'addNewCategory'){
      this.categoryInput = true;
      return;
    }else if(this.categoryName != '' && this.categoryId == 'addNewCategory'){
      console.log(this.categoryName);
      this.createCategory(this.categoryName);
    }
    // this.nextStep.emit(this.step);
  }

  categorySelected(opt:any){
    console.log(opt, "este es la categoria Seleccionada");
    this.flagDisabled = true;
    this.categoryId = opt;
    if(opt == 'addNewCategory'){
      this.flagDisabledButton =  false;
      this.newCategoryInput = true;
      // this.createCategory();
    }else{
      this.subcategorySub = this.productService.getSubCategory(opt).subscribe({
        next: (data:any)=>{
          this.subcategories = data;
          this.flagDisabled = false;
        },
        error: (err:any)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("Complete");
        }
      })
    }
  }

  subcategorySelected(opt:any){
    this.subcategoryId = opt;
    this.flagDisabledButton =  false;
  }

  createCategory(name: string){
    let body={
      categoryName: name
    };
    this.createCategroySub = this.productService.setCategory(body).subscribe({
      next: (data:any)=>{
        switch(data.body){
          case INSERT_SUCCESFUL:
            this.textNotification = 'La categoría '+name+' se agregó correctamente';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.notificationError = true;
            this.createSubcategory(name);
            break;
          case CATEGORY_EXIST:
            this.textNotification = 'La categoría '+name+' ya existe, por favor seleccionala desde el selector de categoría o cambia el nombre de la categoría';
            this.styleModal = 'flex items-center p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700'
            this.notificationError = true;
            break;
          case INSERT_FAILED:
            this.textNotification = 'La categoría '+name+'no se pudo registrar correctamente, por favor vuelva a intentarlo';
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

  createSubcategory(name: string){
    let body={
      categoryName: name
    };
    this.createCategroySub = this.productService.setCategory(body).subscribe({
      next: (data:any)=>{
        switch(data.body){
          case INSERT_SUCCESFUL:
            this.textNotification = 'La categoría '+name+' se agregó correctamente';
            this.styleModal = 'flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
            this.notificationError = true;
            this.createSubcategory(name);
            break;
          case CATEGORY_EXIST:
            this.textNotification = 'La categoría '+name+' ya existe, por favor seleccionala desde el selector de categoría o cambia el nombre de la categoría';
            this.styleModal = 'flex items-center p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800';
            this.styleButtonCloseModal = 'ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700'
            this.notificationError = true;
            break;
          case INSERT_FAILED:
            this.textNotification = 'La categoría '+name+'no se pudo registrar correctamente, por favor vuelva a intentarlo';
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

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.createCategroySub?.unsubscribe();
  }
}
