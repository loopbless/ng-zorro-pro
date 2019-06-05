import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nzo-theme-color',
  templateUrl: './theme-color.component.html',
  styleUrls: ['./theme-color.component.less']
})
export class ThemeColorComponent implements OnInit {

  colorList = [
    {
      key: 'dust',
      color: '#F5222D',
    },
    {
      key: 'volcano',
      color: '#FA541C',
    },
    {
      key: 'sunset',
      color: '#FAAD14',
    },
    {
      key: 'cyan',
      color: '#13C2C2',
    },
    {
      key: 'green',
      color: '#52C41A',
    },
    {
      key: 'daybreak',
      color: '#1890FF',
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
    },
    {
      key: 'purple',
      color: '#722ED1',
    },
  ];

  @Input() selected: string = this.colorList[0].color;

  constructor() {
  }

  ngOnInit() {
  }

}
