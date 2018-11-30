import { Component, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from 'app/products.service';
import { ShoppingCartService, Item } from 'app/shopping-cart.service';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
    selector: 'product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    private product: Product;
    private quantity: number;
    private dialogVisible: boolean;

    /**
     * Initializes a new instance of the ProductComponent class.
     *
     * @param route                   The active route.
     * @param productsService         The products service.
     */
    constructor(private route: ActivatedRoute, private productsService: ProductsService, private shoppingCartService: ShoppingCartService) {
        this.quantity = 1;
        this.dialogVisible = false;
        this.product = new Product;
        this.product.image = 'white.png';
        this.product.price = 0;
        this.product.features = [];
    }

    /**
     * Occurs when the component is initialized.
     * Gets the selected product and save it in a Product object.
     */
    ngOnInit() {
        const productId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        this.productsService.getProduct(productId).then((product) => {
            const tempProduct = new Product;

            tempProduct.id = product.id;
            tempProduct.name = product.name;
            tempProduct.price = product.price;
            tempProduct.image = product.image;
            tempProduct.category = product.category;
            tempProduct.description = product.description;
            tempProduct.features = product.features;

            this.product = tempProduct;
        }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * Called when the form button is clicked.
     * Adds the product with the appropriate quantity in the shopping cart.
     */
    private addProduct(): void {
        this.shoppingCartService.getItems().then(items => {
            let itemFound = false;
            items.forEach(item => {
                if (item.productId === this.product.id) {
                    itemFound = true;
                    this.shoppingCartService.updateItem(this.product.id, this.quantity).then(() => {
                        this.showDialog();
                        return;
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });

            if (!itemFound) {
                this.shoppingCartService.addItem(this.product.id, this.quantity).then(() => {
                    this.showDialog();
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    /**
     * Shows the dialog telling that the product has been added in the cart for 5 seconds.
     */
    private showDialog() {
        this.dialogVisible = true;
        setTimeout(() => {
            this.dialogVisible = false;
        }, 5000);
    }
}
