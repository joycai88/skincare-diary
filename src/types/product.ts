import type { Timestamp } from "firebase/firestore";

// Form data
export type ProductInput = {
    name: string;
    brand: string;
    type: string;
    description: string;
    price: string;
    count: number;
    imageUrl: string;
};

// Database object
export type Product = ProductInput & {
    id: string;
    createdAt?: Timestamp;
};