import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  collection: any;
  response: any;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  sortColumn: string;
  sortDirection: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJson();
  }

  getJson() {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((res: any) => {
      this.response = res;
      this.collection = [...this.response];
    });
  }

  // SEARCHING THE DATA
  performFilter(searchTerm) {
    this.collection = this.response.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  // PAGINATION BASED ON ROWS
  onSelectChange(value) {
    console.log("🚀 ~ file: table.component.ts:78 ~ TableComponent ~ onSelectChange ~ valu̥e:", value);
    return this.itemsPerPage = value;
  }

  //SORTING OF TABLE
  sortTable(value: string): void {
    if (this.sortColumn === value) {
      this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending';
    }
    else {
      this.sortColumn = value;
      this.sortDirection = 'ascending';
    }
    this.collection.sort((a, b) => {
      const a_Value = a[value];
      const b_Value = b[value];

      if (a_Value < b_Value) {
        return this.sortDirection === 'ascending' ? 1 : -1;
      } else if (a_Value > b_Value) {
        return this.sortDirection === 'ascending' ? -1 : 1;
      }
    });
  }
  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }
    return 'unfold_more';
  }


  // DRAG AND DROP
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.collection, event.previousIndex, event.currentIndex);
  }

}
