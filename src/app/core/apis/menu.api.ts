import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MenuApi {
  constructor(private http: HttpClient) {
  }

  list() {
    return of([
      {name: '仪表盘', router: '/dashboard', icon: 'dashboard'},
      {
        name: '列表页', icon: 'table', children: [
          {name: '基础表格', router: '/table/basic-table'},
          {name: '查询表格', router: '/table/query-table'},
        ]
      },
      {
        name: '表单页', icon: 'form', children: [
          {name: '基础表单', router: '/form/basic-form'},
          {name: '高级表单', router: '/form/advanced-form'},
        ]
      },
      {
        name: '树形结构', icon: 'branches', children: [
          {name: '基础树', router: '/tree/basic-tree'},
          {name: '高级树', router: '/tree/advanced-tree'},
        ]
      },
    ]);
  }
}
