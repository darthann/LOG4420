import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from 'app/orders.service';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
    selector: 'confirmation',
    templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {

    private order: Order;

    /**
     * Initializes a new instance of the ComfimationComponent class.
     *
     * @param ordersService The orders service to use.
     */
    constructor(private ordersService: OrdersService) {
        this.order = new Order;
    }

    /**
     * Occurs when the component is initialized.
     */
    ngOnInit() {
        this.ordersService.getOrders().then(orders => {
            this.order = orders[orders.length - 1];
        }).catch(err => {
            console.log(err);
        });
    }
}
