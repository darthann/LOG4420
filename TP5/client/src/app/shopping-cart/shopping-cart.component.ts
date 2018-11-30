import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, Item } from 'app/shopping-cart.service';
import { ProductsService } from 'app/products.service';

class CartProduct {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

    private products: CartProduct[];
    private total: number;

    constructor(private shoppingCartService: ShoppingCartService, private productService: ProductsService) {
        this.products = [];
        this.total = 0;
    }

    ngOnInit() {
        this.shoppingCartService.getItems().then(items => {
            items.forEach(item => {
                this.productService.getProduct(item.productId).then(product => {
                    const cartProduct = new CartProduct;

                    cartProduct.id = item.productId;
                    cartProduct.name = product.name;
                    cartProduct.price = product.price;
                    cartProduct.quantity = item.quantity;

                    this.products.push(cartProduct);
                    this.total += product.price * item.quantity;
                    this.sortByName();
                });
            });
        }).catch(err => {
            console.log(err);
        });
    }

    private sortByName(): void {
        this.products.sort((productA, productB) => {
            if (productA.name < productB.name) {
                return -1;
            }
            return 1;
        });
    }
}
