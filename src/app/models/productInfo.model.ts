import { CategoryInfo } from "./cotegoryInfo.model";

export interface ProductInfo {
    pName: string;
    pDesc: string;
    pSlug: string;
    pCodeBar: number | undefined;
    pQantity: number | undefined;
    pPrice: number | undefined;
    pPercent: number | undefined;
    pPrincipalImage: string
    pOtherUrls: Array<string>;
    pCategoryInfo: CategoryInfo | undefined
}