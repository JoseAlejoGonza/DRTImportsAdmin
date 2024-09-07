import { environment } from "./environments";

export class Endpoints {
    public static PRODUCTS = {
        GET_PRODUCTS: `${environment.host}products`,
        SET_PRODUCT: `${environment.host}new-product`,
        GET_CATEGORIES: `${environment.host}list-category`,
        GET_SUBCATEGORY: (categoryID: number | undefined) => {
            return `${environment.host}list-subcategory/${categoryID}`
        },
        SET_CATEGORY: `${environment.host}new-category`,
        SET_SUBCATEGORY: `${environment.host}new-subcategory`,
        GET_PRODUCT_CODEBAR: (codeBar: number | undefined) => {
            return `${environment.host}get-product-codebar/${codeBar}`
        },
        EDIT_PRODUCT: `${environment.host}edit-product`,
    };
    public static LOGIN = {
        VALIDATE_CREDENTIALS: `${environment.host}login`
    };
    public static USERS = {
        GET_USERS: `${environment.host}users-admin`
    };
}