export class FlowchartUtil {
  private static isHex(color: string): boolean {
    return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color);
  }

  private static isRgbOrRgba(color: string): boolean {
    return /^rgb/.test(color);
  }

  static hex2Rgba(hex: string, alpha: number = 1) {
    let color = hex.toLowerCase();
    if (color && this.isHex(color)) {
      if (color.length === 4) {
        let color1 = '#';
        for (let i = 1; i < 4; i += 1) {
          color1 += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = color1;
      }
      const rgbColors = [];
      for (let i = 1; i < 7; i += 2) {
        rgbColors.push(parseInt('0x' + color.slice(i, i + 2), 0));
      }
      return 'rgba(' + rgbColors.join(',') + ',' + (alpha || 1) + ')';
    }
    return color;
  }

  static gradientColor(startColor: string, endColor: string, gradient: number) {
    if (gradient >= 1) {
      return startColor;
    }
    if (
      (this.isHex(startColor) || this.isRgbOrRgba(startColor)) &&
      (this.isHex(endColor) || this.isRgbOrRgba(endColor))
    ) {
      const color1 = this.hex2Rgba(startColor)
        .replace(/^rgba?\(([\,\s\d]+)\)$/, '$1')
        .split(',');
      const color2 = this.hex2Rgba(endColor)
        .replace(/^rgba?\(([\,\s\d]+)\)$/, '$1')
        .split(',');
      const rColor =
        (parseInt(color2[0], 0) - parseInt(color1[0], 0)) * (1 - gradient) +
        parseInt(color1[0], 0);
      const gColor =
        (parseInt(color2[1], 0) - parseInt(color1[1], 0)) * (1 - gradient) +
        parseInt(color1[1], 0);
      const bColor =
        (parseInt(color2[2], 0) - parseInt(color1[2], 0)) * (1 - gradient) +
        parseInt(color1[2], 0);
      return `rgb(${Math.floor(rColor)},${Math.floor(gColor)},${Math.floor(
        bColor,
      )})`;
    }
    return startColor;
  }
}
