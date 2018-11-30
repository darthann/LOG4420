import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

export class Item {
    productId: number;
    quantity: number;
}

@Injectable()
export class ShoppingCartService {

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

    getItems(): Promise<Item[]> {
        const url = `${Config.apiUrl}/shopping-cart`;
        return this.http.get(url, Config.options).toPromise().then(items => items as Item[]).catch(ShoppingCartService.handleError);
    }

    getItem(productId: number): Promise<Item> {
        const url = `${Config.apiUrl}/shopping-cart/${productId}`;
        return this.http.get(url, Config.options).toPromise().then(item => item as Item).catch(ShoppingCartService.handleError);
    }

    addItem(itemId, quantity): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart`;

        return this.http.post(url, JSON.stringify({
            productId: itemId,
            quantity: quantity
        }), Config.options).toPromise().then(() => true).catch(ShoppingCartService.handleError);
    }

    updateItem(itemId, quantity): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart/${itemId}`;

        return this.http.put(url, JSON.stringify({
            productId: itemId,
            quantity: quantity
        }), Config.options).toPromise().then(() => true).catch(ShoppingCartService.handleError);
    }

    deleteItem(productId: number): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart${productId}`;
        return this.http.delete(url, Config.options).toPromise().then(hasError => !hasError).catch(ShoppingCartService.handleError);
    }

    deleteItems(): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart`;
        return this.http.delete(url, Config.options).toPromise().then(() => true).catch(ShoppingCartService.handleError);
    }
}
