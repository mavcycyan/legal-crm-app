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

  constructor() { }
  setEditBtnData(data: EditBtnData = {type: '', id: null}): void {
    this.editBtnData = data;
    this.subjectData.next(this.editBtnData);
  }
  getEditDataObservable() {
    return this.subjectData.asObservable();
  }
}
