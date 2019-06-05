export interface NzoList {
  loadData(...args);
}

export interface NzoPagination {
  number?: number;
  limit?: number;
}

export class NzoBaseList {

  isLoading = false;

  pagination: NzoPagination = {number: 1, limit: 10};

  pageData: { total: number; list: any[] } = {total: 0, list: []};

  get pages() {
    return Math.ceil(this.pageData.total / this.pagination.limit);
  }

  loadData(page?: NzoPagination) {
  }

  onChangePageIndex(event) {
    this.loadData(this.pagination);
  }

  onChangePageSize(event) {
    this.loadData(this.pagination);
  }

}
