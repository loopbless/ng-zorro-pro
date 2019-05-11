import { Component, OnInit } from '@angular/core';
import { NzoFormList } from '@utils/list';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ant-pro-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.less']
})
export class QueryTableComponent extends NzoFormList implements OnInit {

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

  isCollapse = true;
  tableForm: any;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.tableForm = this.fb.group({
      name: [null],
      status: [null],
      number: [null],
      date: [null],
      status1: [null],
      status2: [null],
    });
  }

  onResetForm() {
  }
}
