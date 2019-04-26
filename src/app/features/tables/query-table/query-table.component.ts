import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pro-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.less']
})
export class QueryTableComponent implements OnInit {

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
