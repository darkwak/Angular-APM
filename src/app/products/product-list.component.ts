import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit, OnDestroy{
    /** Propertiies */
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargine: number = 2;
    showImage: boolean = false;
    errorMessage: string = "";
    sub!: Subscription;
    
    private _listFilter: string = "";

    get listFilter(): string {
        return this._listFilter;
        //console.log("GetteR: " + this._listFilter)
    }
    
    set listFilter(value: string) {
        this._listFilter = value;
        console.log("In setter: ", value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    /** Constructor & Singleton */
    constructor(private productService: ProductService) {}

    /** Methods  */
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage  = !this.showImage;
    }

    ngOnInit(): void {
       this.sub = this.productService.getProducts().subscribe({
            next: product => {
                this.products = product;
                this.filteredProducts = this.products;
            },
            
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        
    }


    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

}