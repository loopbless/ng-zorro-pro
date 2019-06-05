import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'nozFnValue'
})
export class NozFnValuePipe implements PipeTransform {
  /**
   * 转化值，可能是函数
   * @param value 变量
   * @param args 参数
   */
  transform(value: number | string | ((...args) => void), ...args): any {
    if (value && typeof value === 'function') {
      return value(...args);
    }
    return value;
  }
}
