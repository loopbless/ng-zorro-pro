import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

@Injectable({providedIn: 'root'})
export class TableApi {
  constructor(private http: HttpClient) {
  }

  findByPage(page) {
    return of({
      list: [
        {
          key: '1',
          name: 'John Brown',
          description: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim Green',
          description: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          description: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ],
      total: 3
    });
  }
}
