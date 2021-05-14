export class MabnaStorage {
  public static getItem(token: string) {
    return localStorage.getItem(token);
  }

  public static setItem(token: string, value: string) {
    return localStorage.setItem(token, value);
  }

  public static removeItem(token: string) {
    return localStorage.removeItem(token);
  }
}

