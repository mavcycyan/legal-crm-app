import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statuswork'
})
export class StatusworkPipe implements PipeTransform {

  transform(status: string = ''): string {
    if (status === 'done') {
      return 'Завершена успішно';
    } else if (status === 'pending') {
      return 'У процессі';
    } else if (status === 'canceled') {
      return 'Завершена погано';
    }
    return status;
  }

}
