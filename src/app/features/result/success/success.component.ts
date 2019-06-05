import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nzo-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.less']
})
export class SuccessComponent implements OnInit {

  constructor(private message: NzMessageService) { }

  ngOnInit() {
  }

  onDing() {
    this.message.error('发送失败！继续钉他');
  }
}
