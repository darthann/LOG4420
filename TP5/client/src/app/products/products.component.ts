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

    /**
     * Initializes a new instance of the ProductComponent class.
     *
     * @param productsService   The products service.
     */
    constructor(private productsService: ProductsService) {
        this.products = [];
        this.category = "all";
        this.criteria = "price-asc";
    }

    /**
     * Occurs when the component is initialized.
     */
    ngOnInit() {
        this.getProducts();
    }

    /**
     * This method is called when one of the Category buttons is clicked.
     * It changes the category filter and only shows the appropriate products.
     * 
     * @param category The selected category.
     */
    private changeCategory(category: string) : void {
        this.category = category;
        this.getProducts();
    }

    /**
     * This method is called when one of the Criteria buttons is clicked.
     * It changes the criteria filter and shows the products sorted in the appropriate way.
     * 
     * @param criteria The selected criteria.
     */
    private changeCriteria(criteria: string) : void {
        this.criteria = criteria;
        this.getProducts();
    }

    /**
     * Gets all the products and save them in a list.
     */
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
