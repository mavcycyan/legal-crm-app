import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolename'
})
export class RolenamePipe implements PipeTransform {

  transform(role_id: number|null = null): string {
    if (role_id !== null) {
      if (role_id === 1) {
        return 'Супер-адміністратор';
      } else if (role_id === 2) {
        return 'Директор';
      } else if (role_id === 3) {
        return 'Юрист';
      } else if (role_id === 4) {
        return 'Адвокат';
      }
    }
    return '';
  }

}
