import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'nzo-basic-tree',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class BasicComponent implements OnInit, OnDestroy {

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {title: '0-0-0-0', key: '0-0-0-0', isLeaf: true},
            {title: '0-0-0-1', key: '0-0-0-1', isLeaf: true},
            {title: '0-0-0-2', key: '0-0-0-2', isLeaf: true}
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {title: '0-0-1-0', key: '0-0-1-0', isLeaf: true},
            {title: '0-0-1-1', key: '0-0-1-1', isLeaf: true},
            {title: '0-0-1-2', key: '0-0-1-2', isLeaf: true}
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {title: '0-1-0-0', key: '0-1-0-0', isLeaf: true},
        {title: '0-1-0-1', key: '0-1-0-1', isLeaf: true},
        {title: '0-1-0-2', key: '0-1-0-2', isLeaf: true}
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
