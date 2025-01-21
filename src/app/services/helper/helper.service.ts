import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getStatus(status: string): string {
    if (status === 'done') {
      return 'Завершена';
    } else if (status === 'pending') {
      return 'У процессі';
    } else if (status === 'canceled') {
      return 'Завершена погано';
    }
    return status;
  }
}
