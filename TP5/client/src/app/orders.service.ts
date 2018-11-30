import { Item } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Defines an order.
 */
export class Order {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    products: Item[];
}

@Injectable()
export class OrderService {

    /**
     * Handles the current error.
     *
     * @param error                   The error to handle.
     * @return {Promise<object>}      A promise object.
     */
    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.feedbackMessage || error);
    }

    /**
     * Initializes a new instance of the ProductsService class.
     *
     * @param http                    The HTTP service to use.
     */
    constructor(private http: HttpClient) { }
}
