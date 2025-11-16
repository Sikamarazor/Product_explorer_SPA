export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    thumbnailUrl?: string;
    createdAt?: number; // ISO date
}