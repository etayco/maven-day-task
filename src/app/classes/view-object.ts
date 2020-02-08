import {EventEmitter} from '@angular/core';

/**
 * This class is meant to wrap an object that could be filtered.
 * Thanks to this class the original object sitting in cache remains untouched and we don't need to duplicate it as well.
 */
export class FilterableObject<T> {
  objectData: T;
  private _shouldShow: boolean;
  shouldShowStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(objectData: T, shouldShow: boolean) {
    this.objectData = objectData;
    this._shouldShow = shouldShow;
  }

  get shouldShow(): boolean {
    return this._shouldShow;
  }

  set shouldShow(value: boolean) {
    this._shouldShow = value;
    this.shouldShowStateChanged.emit(value);
  }
}
