import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  collection: any;
  response: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortColumn: string;
  sortDirection: string;
  newArray = [];
  button1Active: boolean = false;
  button2Active: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJson();
    this.generateRandomDates();
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
    return "arrow_upward";
  }


  // DRAG AND DROP
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.collection, event.previousIndex, event.currentIndex);
  }

  // DATA SELECTION
  activateButton(booleanValue): void {
    if (booleanValue === true) {
      this.button1Active = true;
      this.button2Active = false;
      this.collection.forEach(element => {
        if (element.completed == true) {
          this.newArray.push(element);
          this.collection = this.newArray;
        }
      });
    } else if (booleanValue === false) {
      this.button1Active = false;
      this.button2Active = true;
      this.collection.forEach(element => {
        if (element.completed == false) {
          this.newArray.push(element);
          this.collection = this.newArray;
        }
      });
    }
  }

  // DATE
  generateRandomDates() {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        this.collection.forEach(element => {
          const randomDate = this.getRandomDate();
          const currentDate = moment(randomDate).format('DD/MM/YYYY');
          element.date = currentDate;
        });
      }, 110);
    }
  }
  getRandomDate(): Date {
    const startDate = new Date(2000, 0, 1);
    const endDate = new Date();
    const randomTimestamp = startDate.getTime() + (Math.random() * (endDate.getTime() - startDate.getTime()));
    return new Date(randomTimestamp);
  }
}