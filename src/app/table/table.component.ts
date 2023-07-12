import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
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

  performFilter(searchTerm) {
    this.collection = this.response.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // PAGINATION OF TABLE
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }
  getTotalPages(): number {
    return Math.ceil(this.collection.length / this.itemsPerPage);
  }
  getPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.collection.slice(startIndex, endIndex);
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

  // DRAG AND DROP
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.collection, event.previousIndex, event.currentIndex);
  }
}
