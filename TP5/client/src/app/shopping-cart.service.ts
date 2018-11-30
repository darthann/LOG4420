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

    /**
     * Gets all the items that are currently in the shopping-cart.
     */
    getItems(): Promise<Item[]> {
        const url = `${Config.apiUrl}/shopping-cart`;
        return this.http.get(url, Config.options).toPromise().then(items => items as Item[]).catch(ShoppingCartService.handleError);
    }

    /**
     * Gets a single product that is in the database.
     * @param productId The id associated with the product.
     */
    getItem(productId: number): Promise<Item> {
        const url = `${Config.apiUrl}/shopping-cart/${productId}`;
        return this.http.get(url, Config.options).toPromise().then(item => item as Item).catch(ShoppingCartService.handleError);
    }

    /**
     * Adds the current product (along with its quantity) in the shopping-cart.
     * @param productId The id associated with the product.
     * @param quantity The quantity of the product.
     */
    addItem(productId, quantity): Promise<{}> {
        const url = `${Config.apiUrl}/shopping-cart`;

        return this.http.post(url, JSON.stringify({
            productId: productId,
            quantity: quantity
        }), Config.options).toPromise().then().catch(ShoppingCartService.handleError);
    }

    /**
     * Changes the quantity of a product in the shopping-cart.
     * @param productId The id associated with the product.
     * @param quantity The new quantity of the product.
     */
    updateItem(productId, quantity): Promise<{}> {
        const url = `${Config.apiUrl}/shopping-cart/${productId}`;

        return this.http.put(url, JSON.stringify({
            productId: productId,
            quantity: quantity
        }), Config.options).toPromise().then().catch(ShoppingCartService.handleError);
    }

    /**
     * Removes an item from the shopping-cart.
     * @param productId The id associated with the product.
     */
    deleteItem(productId: number): Promise<{}> {
        const url = `${Config.apiUrl}/shopping-cart${productId}`;
        return this.http.delete(url, Config.options).toPromise().then().catch(ShoppingCartService.handleError);
    }

    /**
     * Removes all items in the shopping-cart.
     */
    deleteItems(): Promise<{}> {
        const url = `${Config.apiUrl}/shopping-cart`;
        return this.http.delete(url, Config.options).toPromise().then().catch(ShoppingCartService.handleError);
    }
}
