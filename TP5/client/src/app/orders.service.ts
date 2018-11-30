import { Item } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

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

    /**
     * Gets all the orders from the database.
     */
    getOrders(): Promise<Order[]> {
        const url = `${Config.apiUrl}/orders`;
        return this.http.get(url, Config.options).toPromise().then(orders => orders as Order[]).catch(OrderService.handleError);
    }

    /**
     * Gets a single order from the database.
     * @param orderId The id associated with the order.
     */
    getOrder(orderId: number): Promise<Order> {
        const url = `${Config.apiUrl}/orders/${orderId}`;
        return this.http.get(url, Config.options).toPromise().then(order => order as Order).catch(OrderService.handleError);
    }

    /**
     * Creates an order in the database.
     * @param order The order to be created.
     */
    createOrder(order: Order): Promise<{}> {
        const url = `${Config.apiUrl}/orders`;
        return this.http.post(url, JSON.stringify({
            id: order.id,
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            phone: order.phone,
            products: order.products
        }), Config.options).toPromise().then().catch(OrderService.handleError);
    }

    /**
     * Removes an order from the database.
     * @param orderId The id associated with the order.
     */
    deleteOrder(orderId: number): Promise<{}> {
        const url = `${Config.apiUrl}/orders/${orderId}`;
        return this.http.delete(url, Config.options).toPromise().then().catch(OrderService.handleError);
    }

    /**
     * Removes all orders from the database.
     */
    deleteOrders(): Promise<{}> {
        const url = `${Config.apiUrl}/orders`;
        return this.http.delete(url, Config.options).toPromise().then().catch(OrderService.handleError);
    }
}
