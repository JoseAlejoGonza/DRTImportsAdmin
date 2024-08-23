import { environment } from "./environments";

export class Endpoints {
    public static PRODUCTS = {
        GET_PRODUCTS: `${environment.host}products`,
        GET_CATEGORIES: `${environment.host}list-categories`,
        GET_CATEGORY: (categoryID: number | undefined) => {
            return `${environment.host}category/${categoryID}`
        }            
    };
    public static LOGIN = {
        VALIDATE_CREDENTIALS: `${environment.host}login`
    };
}