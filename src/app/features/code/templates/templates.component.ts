import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CodeApi } from '@apis/code';
import { Router } from '@angular/router';

@Component({
  selector: 'nzo-templates',
  templateUrl: './templates.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TemplatesComponent implements OnInit {

  list = [];
  loading = false;
  selected = this.code.getFlow('template') || 0;

  constructor(private code: CodeApi,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.code.listTemplate().subscribe(data => {
      this.list = data;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  onGoNext() {
    this.code.setFlow('template', this.selected);
    this.router.navigate([`/code/setting/${this.list[this.selected].code}`]);
  }
}
