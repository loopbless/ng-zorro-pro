
class NzoIList {
}

export class NzoMultipleList {

  private currentKey: string;

  nzoLists: {[key: string]: any};

  loadData(key, page?) {
  }

  onSearch(key, event?: KeyboardEvent) {
    this.currentKey = key;
  }
}
