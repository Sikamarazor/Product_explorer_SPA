export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    thumbnailUrl?: string;
    createdAt?: string; // ISO date
}