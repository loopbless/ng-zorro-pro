import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzoBaseForm } from '@utils/form';
import { TableApi } from '@apis/table';
import { NzoPageField } from '@shared/page-pagination/page-pagination.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nzo-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.less']
})
export class QueryTableComponent extends NzoBaseForm implements OnInit {

  isCollapse = true;

  @ViewChild('fieldTmpl') fieldTmpl: TemplateRef<any>;

  fields: NzoPageField[];

  constructor(public api: TableApi,
              private message: NzMessageService) {
    super({
      name: [null],
      status: [null],
      number: [null],
      date: [null],
      status1: [null],
      status2: [null],
    });
  }

  ngOnInit() {
    this.fields = [
      {title: '序号', fieldValue: (data, i) => i + 1},
      {title: '名称', template: this.fieldTmpl},
      {title: '描述', fieldKey: 'description'},
      {title: '地址', fieldKey: 'address'},
      {
        title: '操作', actions: [{
          name: '修改',
          action: (data) => {
            this.message.success('您点击修改`' + data.name + '`');
          }
        }]
      },
    ];
  }

}
