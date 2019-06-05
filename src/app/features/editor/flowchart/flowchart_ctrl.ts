import { fromEvent, of } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';


export class CtrlDrag {

  addListener(elem: Element, target: Element | string) {
    const mouseUp$ = fromEvent(document, 'mouseup');
    let startPos = null;
    const originTarget = target;
    return fromEvent(elem, 'mousedown').pipe(switchMap(event => {
      startPos = startPos ? startPos : this.getOffsetPos(elem);
      target = this.getHasTarget(event.target, originTarget);
      return target ? this.getMousemove$(elem, target, event, startPos).pipe(map(data => {
        if (target instanceof SVGElement) {
          (target as any).setAttribute('transform', `translate(${data.x},${data.y})`);
        } else {
          (target as any).style.transform = `translate(${data.x} ${data.y})`;
        }
        return data as any;
      }), takeUntil(mouseUp$)) : of(event);
    }), filter(data => !!data));
  }

  getBox(elem: any) {
    if (elem instanceof SVGElement) {
      let attr: any = elem.getAttribute('transform');
      if (/^translate\(([\d\,\s]+)\)$/.test(attr)) {
        attr = attr.replace(/^translate\(([\d\,\s]+)\)$/, '$1')
          .split(',');
      }
      const {width, height, x, y} = (elem as any).getBBox();
      return {width, height, x: attr[0] || x, y: attr[1] || y};
    } else {
      return {
        ...this.getOffsetPos(elem),
        height: elem.clientHeight,
        width: elem.clientWidth
      };
    }
  }

  private getMousemove$(elem: any, targetElem: any, originElem: any, startPos: any) {
    const box = this.getBox(targetElem);
    let x = originElem.clientX - startPos.x;
    let y = originElem.clientY - startPos.y;
    const pos = {x: x - box.x, y: y - box.y};
    return fromEvent(document, 'mousemove').pipe(map((event: any) => {
      x = event.clientX - startPos.x - pos.x;
      y = event.clientY - startPos.y - pos.y;
      return {
        x: x > 0 ? ((x + box.width) < elem.clientWidth ? x : elem.clientWidth - box.width) : 0,
        y: y > 0 ? ((y + box.height) < elem.clientHeight ? y : elem.clientHeight - box.height) : 0
      };
    }));
  }

  private getHasTarget(elem: any, target: Element | string) {
    const className = typeof elem.className === 'string' ? elem.className : (elem.className as any).baseVal;
    const isString = typeof target === 'string';
    if (isString && !className.includes(target as string) || (!isString && elem === target)) {
      return elem instanceof SVGElement ? this.getHasTarget(elem.parentElement, target) : null;
    } else {
      return elem;
    }
  }

  private getOffsetPos(elem: any) {
    const pos = {x: 0, y: 0};
    let target = elem;
    while (target) {
      pos.x += target.offsetLeft;
      pos.y += target.offsetTop;
      target = target.offsetParent;
    }
    return pos;
  }
}
