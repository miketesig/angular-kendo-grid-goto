import { products } from './products';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CompositeFilterDescriptor,
  filterBy,
  FilterDescriptor,
} from '@progress/kendo-data-query';
import { sampleProducts } from './products';
import {
  GridComponent,
  GridDataResult,
  RowArgs,
  SelectableSettings,
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'my-app',
  template: `
  <div class="example-config">
    <input #findThis (keyup)="handleKeyup($event)" placeholder="find..." [(ngModel)]="filterText">
    <pre>Selected: {{this.selectedItem?.ProductName}}</pre>
    <pre>this.mySelection: {{this.mySelection}}</pre>
    <pre>this.counter: {{this.counter}}</pre>

  </div>

    <button kendoButton (click)="grid.scrollTo({ row: 14, column: 0 })">Scroll to 15th row</button>
    <button kendoButton (click)="grid.scrollTo({ row: 24, column: 2 })">Scroll to 25th row, 3rd column</button>

        <kendo-grid #grid [data]="gridView" style="height: 400px; width: 500px;"
        [skip]="skip"
        [pageable]="false"
        [navigable]="true"
        [height]="500"
        [selectable]="{enabled: true, mode: 'single'}"
        kendoGridSelectBy="ProductID"
        [(selectedKeys)]="mySelection"
        >
            <ng-template kendoGridToolbarTemplate>
            </ng-template>
            <kendo-grid-column field="ProductID" title="ID" [width]="40"> </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Name" [width]="250"> </kendo-grid-column>
        </kendo-grid>
        {{this.gridView | json}}
    `,
})
export class AppComponent {
  @ViewChild('findThis', { static: false }) findThis: ElementRef;
  @ViewChild('grid') public grid: GridComponent;
  public gridView: GridDataResult;
  public items: any[] = sampleProducts;
  public mySelection: number[] = [1];
  public pageSize = 500;
  public skip = 0;
  public filterText;
  public selectedItem;
  public counter = 0;

  constructor() {
    this.loadItems();
  }

  private loadItems(): void {
    this.gridView = {
      data: this.items,
      total: this.items.length,
    };
  }

  handleKeyup(event) {
    switch (event.key) {
      case 'ArrowUp': {
        // this.skip = Math.max(0, this.skip - 1);
        // if (this.filterText) {
        //   this.applyFilter(this.filterText);
        // } else {
        //   this.grid.scrollTo({ row: this.mySelection[0], column: 0 });
        //   //this.loadItems();
        // }
        // this.mySelection = [this.gridView.data[0].ProductID];
        if (this.counter !== 0) this.counter--;
        this.grid.scrollTo({ row: this.counter, column: 1 });
        this.mySelection = [this.counter + 1];
        break;
      }

      case 'ArrowDown': {
        // if (this.gridView.data.length === 1) {
        //   return;
        // }
        // this.skip++;
        // if (this.filterText) {
        //   this.applyFilter(this.filterText);
        // } else {
        //   //this.loadItems();
        //   this.grid.scrollTo({ row: 5, column: 0 });
        // }
        // this.mySelection = [this.gridView.data[0].ProductID];
        this.counter++;
        this.grid.scrollTo({ row: this.counter, column: 0 });
        this.mySelection = [this.counter + 1];
        break;
      }

      case 'Enter': {
        if (this.gridView.data[0]) {
          this.selectedItem = this.gridView.data[this.counter];
        }
        break;
      }

      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        break;

      default: {
        this.counter = 0;
        this.mySelection = [this.counter + 1];
        this.applyFilter(this.filterText);
        break;
      }
    }
  }

  public applyFilter(val): void {
    const filter: FilterDescriptor = {
      operator: 'contains',
      value: val,
      field: 'ProductName',
    };

    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };

    this.gridView.data = filterBy(sampleProducts, filter);
    this.gridView.data = this.gridView.data.slice(
      this.skip,
      this.skip + this.pageSize
    );
  }
}
