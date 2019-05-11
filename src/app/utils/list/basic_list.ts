export interface QueryPage {
  index?: number;
  size?: number;
}

export class NzoBasicList {

  query: { [key: string]: any };

  page: QueryPage;

  results: { total: number; data: any[] };

  get params() {
    return {...this.query, ...this.page};
  }

  loadData() {
  }


}
