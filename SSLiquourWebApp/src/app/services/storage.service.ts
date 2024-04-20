import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  public save(key: string, value: any): void {
    if (this.isLocalStorageSupported) {
      // Check if value is an object and not a string (like a JWT)
      if (typeof value === 'object' && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        // Save strings directly
        localStorage.setItem(key, value);
      }
    }
  }

  public get(key: string): any {
    if (this.isLocalStorageSupported) {
      const item = localStorage.getItem(key);
      try {
        // Try to parse item as JSON
        return JSON.parse(item);
      } catch (e) {
        // If error, return the item directly (useful for JWTs)
        return item;
      }
    }
    return null;
  }

  public remove(key: string): void {
    if (this.isLocalStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  private get isLocalStorageSupported(): boolean {
    try {
      const testKey = '__test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
