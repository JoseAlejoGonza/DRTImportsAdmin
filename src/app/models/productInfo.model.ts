import { CategoryInfo } from "./cotegoryInfo.model";

export interface ProductInfo {
    pName: string;
    pDesc: string;
    pColors: string;
    pSlug: string;
    pCodeBar: number | undefined;
    pQantity: number | undefined;
    pPrice: number | undefined;
    pPercent: number | undefined;
    pPrincipalImage: string
    pOtherUrls: Array<string>;
    pCategoryInfo: CategoryInfo | undefined
}

export interface ProductToEdit{
    colors: string | undefined;
    bar_code: number | undefined;
    discount: number | undefined;
    images: string | undefined;
    imagesId: string | undefined;
    price: string | undefined;
    product_description: string | undefined;
    product_id: number | undefined;
    product_name: string | undefined;
    price_id: number | undefined;
    regular_price: string | undefined;
    sub_category_name: string | undefined;
    total_quantity: number | undefined;
}