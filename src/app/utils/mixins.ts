export class Mixins {

  /**
   * The class instance maixins multiple class
   * @param instance instance object
   * @param baseCtors class array
   */
  static apply(instance: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
      const prototype = baseCtor.prototype;
      this.extend(instance, prototype);
    });
  }

  static extend(target, prototype) {
    Object.getOwnPropertyNames(prototype).forEach(name => {
      Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(prototype, name));
    });
    if (prototype.__proto__.constructor !== Object) {
      this.extend(target, prototype.__proto__);
    }
  }
}
