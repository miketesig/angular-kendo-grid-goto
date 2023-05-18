import { Component } from '@angular/core';
import { products } from './products';

@Component({
    selector: 'my-app',
    template: `
        <kendo-grid #grid [data]="gridData" style="height: 400px; width: 500px;">
            <ng-template kendoGridToolbarTemplate>
                <button kendoButton (click)="grid.scrollTo({ row: 14, column: 0 })">Scroll to 15th row</button>
                <button kendoButton (click)="grid.scrollTo({ row: 24, column: 2 })">Scroll to 25th row, 3rd column</button>
            </ng-template>
            <kendo-grid-column field="ProductID" title="ID" [width]="40"> </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Name" [width]="250"> </kendo-grid-column>
            <kendo-grid-column field="Category.CategoryName" title="Category" [width]="250"> </kendo-grid-column>
            <kendo-grid-column field="UnitPrice" title="Price" [width]="80"> </kendo-grid-column>
            <kendo-grid-column field="UnitsInStock" title="In stock" [width]="80"> </kendo-grid-column>
            <kendo-grid-column field="Discontinued" title="Discontinued" [width]="120">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <input type="checkbox" [checked]="dataItem.Discontinued" disabled />
                </ng-template>
            </kendo-grid-column>
        </kendo-grid>
    `
})
export class AppComponent {
    public gridData: unknown[] = products;
}
