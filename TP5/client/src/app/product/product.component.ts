import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from 'app/products.service';

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

    /**
     * Initializes a new instance of the ProductComponent class.
     *
     * @param route                   The active route.
     * @param productsService         The products service.
     */
    constructor(private route: ActivatedRoute, private productsService: ProductsService) {
        this.quantity = 1;
    }

    /**
     * Occurs when the component is initialized.
     * Gets the selected product and save it in a Product object.
     */
    ngOnInit() {
        const productId = parseInt(this.route.snapshot.paramMap.get('id'));
        
        this.productsService.getProduct(productId).then((product) => {
            let tempProduct = new Product;

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
    private addProduct() : void {
        console.log("Ajouter " + this.quantity + " exemplaires de ce produits dans le panier.");
    }
}
