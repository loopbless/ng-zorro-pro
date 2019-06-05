import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '@environment';

@Injectable({providedIn: 'root'})
export class CodeApi {

  private flowMap = new Map<string, any>();

  constructor(private http: HttpClient) {
  }

  listTemplate() {
    // return this.http.get(environment.server);
    return of([
      {code: 'list', name: '列表页', image: '', example: ''},
      {code: 'form', name: '表单页', image: '', example: ''},
      {code: 'profile', name: '详情页', image: '', example: ''},
      {code: 'result', name: '结果页', image: '', example: ''},
      {code: 'empty', name: '空白页', image: '', example: ''},
    ]);
  }

  get(id: string) {
    return this.http.get(environment.server + '/template/' + id);
  }

  getFlow(key: string): any {
    return this.flowMap.get(key);
  }

  setFlow(key: string, value: any) {
    this.flowMap.set(key, value);
  }
}
