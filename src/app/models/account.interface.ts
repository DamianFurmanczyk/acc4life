import { currencyData } from './currencyData.interface';
export interface Account {
    created_at: null | string,
    description: string,
    factory: number,
    id: number,
    name: string,
    price_usd: string,
    priceAfterConversion?: number,
    quantity: number,
    region_id: number,
    regions: null | string[],
    slug: string,
    src: string,
    updated_at: string | null
}