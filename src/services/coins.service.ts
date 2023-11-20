import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class CoinsService {
    public balance: BehaviorSubject<number> = new BehaviorSubject(0);
    public balanceObs$: Observable<number> = this.balance.asObservable();

    constructor() {}

    resetBalance(): void {
        this.balance.next(0);
    }
}