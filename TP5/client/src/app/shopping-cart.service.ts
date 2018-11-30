import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

export class Item {
    id: number;
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

        return this.http.get(url).toPromise().then(items => items as Item[]).catch(ShoppingCartService.handleError);
    }

    getItem(productId: number): Promise<Item> {
        const url = `${Config.apiUrl}/shopping-cart/${productId}`;

        return this.http.get(url).toPromise().then(item => item as Item).catch(ShoppingCartService.handleError);
    }

    addItem(itemId, quantity): Promise<{}> {
        const url = `${Config.apiUrl}/shopping-cart`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers, withCredentials: true };

        return this.http.post(url, JSON.stringify({
            productId: itemId,
            quantity: quantity
            }), options).toPromise().then().catch(ShoppingCartService.handleError);
    }

    updateItem(itemId, quantity): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart${itemId}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers, withCredentials: true };

        return this.http.put(url, JSON.stringify({
            productId: itemId,
            quantity: quantity
            }), options).toPromise().then(index => index === 0).catch(ShoppingCartService.handleError);
    }

    deleteItem(productId: number): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart${productId}`;
        const options = { withCredentials: true };

        return this.http.delete(url, options).toPromise().then(hasError => !hasError).catch(ShoppingCartService.handleError);
    }

    deleteItems(): Promise<boolean> {
        const url = `${Config.apiUrl}/shopping-cart`;
        const options = { withCredentials: true };

        return this.http.delete(url, options).toPromise().then(() => true).catch(ShoppingCartService.handleError);
    }
}
