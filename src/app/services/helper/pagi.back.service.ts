import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagiBackService {
  private backLinks: Record<string, string> = {
    backList: '',
    backSingle: '',
    backWorkSingle: ''
  }
  constructor() { }

  refresh() {
    const toObj = sessionStorage.getItem('backLinks');
    this.backLinks = (toObj !== null && toObj !== '') ? JSON.parse(toObj) : this.backLinks;
  }
  linksDry() {
    this.backLinks = {
      backList: '',
      backSingle: '',
      backWorkSingle: ''
    }
    sessionStorage.removeItem('backLinks');
  }

  linksGet() {
    this.refresh();
    return this.backLinks;
  }

  linksSet(type: string, link: string) {
    if (type !== '') {
      this.refresh();
      if (this.backLinks[type] !== undefined) {
        this.backLinks[type] = link;
        sessionStorage.setItem('backLinks', JSON.stringify(this.backLinks));
      }
    }
  }

}
