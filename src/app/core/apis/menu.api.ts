import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MenuApi {
  constructor(private http: HttpClient) {
  }

  list() {
    return of([
      {
        name: '仪表盘', icon: 'dashboard', children: [
          {name: '分析页', router: '/dashboard/analysis'},
          {name: '监控页', router: '/dashboard/monitor'},
          {name: '工作台', router: '/dashboard/workplace'}
        ]
      },
      {
        name: '列表页', icon: 'table', children: [
          {name: '查询表格', router: '/list/table'},
          {name: '标准列表', router: '/list/basic'},
          {name: '卡片列表', router: '/list/card'},
          {
            name: '搜索列表', children: [
              {name: '搜索列表(文章)', router: ''},
              {name: '搜索列表(项目)', router: ''},
              {name: '搜索列表(应用)', router: ''},
            ]
          },
        ]
      },
      {
        name: '表单页', icon: 'form', children: [
          {name: '基础表单', router: '/form/basic'},
          {name: '分步表单', router: '/form/step'},
          {name: '高级表单', router: '/form/advanced'},
        ]
      },
      {
        name: '详情页', icon: 'profile', children: [
          {name: '基础详情', router: '/profile/basic'},
          {name: '高级详情', router: '/profile/advanced'},
        ]
      },
      {
        name: '结果页', icon: 'check-circle-o', children: [
          {name: '成功页', router: '/tree/basic'},
          {name: '失败页', router: '/tree/advanced'},
        ]
      },
      {
        name: '异常页', icon: 'warning', children: [
          {name: '403', router: '/exception/403'},
          {name: '404', router: '/exception/404'},
          {name: '500', router: '/exception/500'},
        ]
      },
      {
        name: '个人信息', icon: 'user', children: [
          {name: '个人中心', router: '/account/center'},
          {name: '个人设置', router: '/account/setting'},
        ]
      },
      {
        name: '图形编辑器', icon: 'highlight', children: [
          {name: '流程编辑器', router: '/editor/flow'},
          {name: '脑图编辑器', router: '/editor/mind'},
          {name: '拓扑编辑器', router: '/editor/topology'},
        ]
      },
    ]);
  }
}
