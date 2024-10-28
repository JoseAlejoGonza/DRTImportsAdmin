export interface PendingPurchase{
    id: number;
    purchase_quantity: number;
    purchase_date: string;
    total_price: string;
    address_to_send: string;
    order_id: string;
    is_being_prepared: number;
    is_delivered: number;
    it_was_sent?: number;
}

export interface ProductsPurchase{
    name: string;
    bar_code: number;
    sub_category_id: number;
    purchase_quantity: number;
    unit_price: string;
    total_price: string;
}