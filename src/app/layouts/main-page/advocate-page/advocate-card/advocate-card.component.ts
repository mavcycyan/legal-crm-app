import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {
  AdvocatesCardInterface,
  AdvocatesCardInterfaceRequest
} from "../../../../models/advocates/advocates-card.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {AdvocateService} from "../../../../services/advocate/advocate.service";

@Component({
  selector: 'app-advocate-card',
  templateUrl: './advocate-card.component.html',
  styleUrls: ['./advocate-card.component.scss']
})
export class AdvocateCardComponent implements OnInit, OnDestroy {
  subAdvocate$: Subscription = {} as Subscription;
  advocate: AdvocatesCardInterface = {} as AdvocatesCardInterface;
  advocateRows: Array<{name: string, slug: string}> = [
    {slug: 'email', name: 'E-mail'},
    {slug: 'birthday', name: 'Рік народження'},
    {slug: 'address', name: 'Адреса'},
    {slug: 'phone', name: 'Телефон'}
  ];

  constructor(private route: ActivatedRoute,
              private advocateService: AdvocateService) {
  }


  ngOnInit(): void {
    this.subAdvocate$ = this.route.params
      .subscribe(
        (params: Params) => {
          let advocateId = 99999999;
          if (params['id'] !== 'personal') {
            advocateId = params['id'];
          } else {
            const userId = sessionStorage.getItem('userId');
            advocateId = (userId !== null) ? parseInt(userId) : 99999999;
          }
          this.advocateService.getOne(advocateId).subscribe((data: AdvocatesCardInterfaceRequest) => {
            this.advocate = data.data;
          });
        }
      )
  }

  ngOnDestroy(): void {
    this.subAdvocate$.unsubscribe();
  }
}
