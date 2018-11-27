import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from 'app/products.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
    selector: 'products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
    private products: Product[];
    private category: string;
    private criteria: string;

    constructor(private productsService: ProductsService) {
        this.products = [];
        this.category = "all";
        this.criteria = "price-asc";
    }

    ngOnInit() {
        this.getProducts();
    }

    private changeCategory(category: string) : void {
        this.category = category;
        this.getProducts();
    }

    private changeCriteria(criteria: string) : void {
        this.criteria = criteria;
        this.getProducts();
    }

    private getProducts() : void {
        this.productsService.getProducts(this.criteria, this.category).then((response) => {
            this.products = [];
            response.forEach(product => {
                let tempProduct = new Product;

                tempProduct.id = product.id;
                tempProduct.name = product.name;
                tempProduct.price = product.price;
                tempProduct.image = product.image;
                tempProduct.category = product.category;
                tempProduct.description = product.description;
                tempProduct.features = product.features;

                this.products.push(tempProduct);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}
