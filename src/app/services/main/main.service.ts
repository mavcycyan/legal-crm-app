import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

interface EditBtnData {
  type: string,
  id: number|null
}
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private editBtnData: EditBtnData = {type: '', id: null};
  private subjectData = new BehaviorSubject<EditBtnData>(this.editBtnData)

  private editBtnSecondaryData: EditBtnData = {type: '', id: null};
  private subjectSecondaryData = new BehaviorSubject<EditBtnData>(this.editBtnSecondaryData)

  private preloader: boolean = false;
  private subjectPreloader = new BehaviorSubject<boolean>(this.preloader)

  constructor() { }
  setEditBtnData(data: EditBtnData = {type: '', id: null}): void {
    this.editBtnData = data;
    this.subjectData.next(this.editBtnData);
  }
  getEditDataObservable() {
    return this.subjectData.asObservable();
  }
  setEditBtnSecondaryData(data: EditBtnData = {type: '', id: null}): void {
    this.editBtnSecondaryData = data;
    this.subjectSecondaryData.next(this.editBtnSecondaryData);
  }
  getEditSecondaryDataObservable() {
    return this.subjectSecondaryData.asObservable();
  }


  getPreloaderStateObservable() {
    return this.subjectPreloader.asObservable();
  }
  setPreloaderState(state: boolean = false): void {
    this.preloader = state;
    this.subjectPreloader.next(this.preloader);
  }
}
