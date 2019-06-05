import { Compiler, Component, OnInit } from '@angular/core';
import { CodeApi } from '@apis/code';

@Component({
  selector: 'nzo-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.less'],
})
export class TemplateFormComponent implements OnInit {

  tabs = [
    {name: 'HTML', icon: ''},
    {name: 'TS', icon: ''},
  ];

  html: string;
  data: any = {};

  constructor(private api: CodeApi,
              private compiler: Compiler) {
  }

  ngOnInit() {
    this.api.get('5cee70a4d9933715a439984d').subscribe(data => {
      this.data = data;
    });
  }

}
