import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzoFormList } from '@utils/list';
import { NzoBaseForm } from '@utils/form';
import { TableApi } from '@apis/table';
import { NzoPageField } from '@shared/page-pagination/page-pagination.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nzo-query-tables',
  templateUrl: './query-tables.component.html',
  styleUrls: ['./query-tables.component.less']
})
export class QueryTablesComponent extends NzoBaseForm implements OnInit {

  isCollapse = true;
  data: any;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  fields: NzoPageField[];
  constructor(private api: TableApi,
              private message: NzMessageService) {
    super();
  }

  ngOnInit() {

    this.formGroup1 = this.nzoFb.group({
      name: [null, Validators.required],
      status: [null],
      number: [null],
      date: [null],
      status1: [null],
      status2: [null],
    });

    this.formGroup2 = this.nzoFb.group({
      name: [null, Validators.required],
      status: [null],
      number: [null],
      date: [null],
      status1: [null],
      status2: [null],
    });

    this.fields = [
      {title: '序号', fieldValue: (data, i) => i + 1},
      {title: '名称', fieldKey: 'name'},
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
