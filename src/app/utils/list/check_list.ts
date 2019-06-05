import { NzoBaseList } from './base_list';

export interface NzoListCheck {
  allChecked: boolean;
  indeterminate: boolean;
  list: { checked: boolean; id: string | number }[];
}

export class NzoCheckList extends NzoBaseList {

  constructor() {
    super();
  }

  nzoCheck: NzoListCheck = {
    allChecked: false,
    indeterminate: false,
    list: [],
  };

  /**
   * get checked item ids
   * @return Array<number|string> checked item ids
   */
  get nzoCheckedIds() {
    const checkedIds = [];
    this.nzoCheck.list.forEach(data => {
      if (data.checked) {
        checkedIds.push(data.id);
      }
    });
    return checkedIds;
  }

  /**
   * get checked item list
   * @return Array<any> checked item list
   */
  get nzoCheckedList() {
    const checkedList = [];
    this.nzoCheck.list.forEach((data, index) => {
      if (data.checked) {
        checkedList.push({...data, index});
      }
    });
    return checkedList;
  }

  nzoInitCheck(data: any[], idKey: string = 'id', selectedIds: (string | number)[] = []) {
    this.nzoCheck = {
      allChecked: false,
      indeterminate: false,
      list: [],
    };
    if (data && data.length > 0) {
      data.forEach(item => {
        this.nzoCheck.list.push({
          checked: selectedIds.includes(item[idKey]),
          id: item[idKey],
        });
      });
      this.nzoRefreshCheck();
    }
  }

  /**
   * refresh checkbox input status
   * @param item checked data
   */
  nzoRefreshCheck(item?: any): void {
    const allChecked = this.nzoCheck.list.every(
      value => value.checked === true,
    );
    const allUnChecked = this.nzoCheck.list.every(value => !value.checked);
    this.nzoCheck.allChecked = allChecked;
    this.nzoCheck.indeterminate = !allChecked && !allUnChecked;
    this.nzoCheckChange(item);
  }

  /**
   * checkbox change event trigger
   * @param item checked data
   */
  nzoCheckChange(item: any) {
  }

  /**
   * set all checkbox status
   * @param value status
   */
  nzoAllCheck(value = true): void {
    this.nzoCheck.list.forEach(data => {
      data.checked = value;
    });
    this.nzoRefreshCheck();
  }

}
