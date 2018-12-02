import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { OrdersService, Order } from 'app/orders.service';
import { Router } from '@angular/router';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
    selector: 'order',
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

    orderForm: any;

    private firstName: string;
    private lastName: string;
    private email: string;
    private phone: string;

    /**
     * Initializes a new instance of the OrderComponent class.
     *
     * @param shoppingCartService The shopping-cart service to use.
     * @param ordersService The orders service to use.
     * @param router The router to use.
     */
    constructor(private shoppingCartService: ShoppingCartService, private ordersService: OrdersService, private router: Router) { }

    /**
     * Occurs when the component is initialized.
     */
    ngOnInit() {
        // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
        this.orderForm = $('#order-form');
        $.validator.addMethod('ccexp', function(value) {
            if (!value) {
                return false;
            }
            const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
            return regEx.test(value);
        }, 'La date d\'expiration de votre carte de crédit est invalide.');
        this.orderForm.validate({
            rules: {
                'phone': {
                    required: true,
                    phoneUS: true
                },
                'credit-card': {
                    required: true,
                    creditcard: true
                },
                'credit-card-expiry': {
                    ccexp: true
                }
            }
        });
    }

    /**
     * Submits the order form.
     */
    submit() {
        if (!this.orderForm.valid()) {
            return;
        }

        this.ordersService.getOrders().then(orders => {
            let orderId: number;
            if (orders.length > 0) {
                orderId = orders[orders.length - 1].id + 1;
            } else {
                orderId = 1;
            }

            this.shoppingCartService.getItems().then(items => {
                items.map(item => {
                    item['id'] = item['productId'];
                    delete item['productId'];
                });

                const order = new Order;

                order.id = orderId;
                order.firstName = this.firstName;
                order.lastName = this.lastName;
                order.email = this.email;
                order.phone = this.phone;
                order.products = items;

                this.ordersService.createOrder(order).then(() => {
                    this.shoppingCartService.deleteItems().then(() => {
                        this.shoppingCartService.updateItemsCount(0);
                        this.router.navigate(['confirmation']);
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }
}
