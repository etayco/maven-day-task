import {EventEmitter} from '@angular/core';

export class ViewObject<T> {
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
