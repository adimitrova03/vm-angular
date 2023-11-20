import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductsModel } from "../models/products.model";

@Injectable({providedIn: 'root'})

export class ProductsService {
    private getProductsUrl = 'assets/requests/products-data.json';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<ProductsModel>{
        return this.http.get<ProductsModel>(this.getProductsUrl);
    }
}