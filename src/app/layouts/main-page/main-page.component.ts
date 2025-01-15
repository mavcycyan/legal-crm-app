import {ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {MainService} from "../../services/main/main.service";
import {Subscription} from "rxjs";

interface EditBtnLink {
  link: string,
  text: string
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent implements OnInit, OnDestroy{
  name: String = '';
  userType: string|null = '';
  btn: boolean = false;
  btnLink: EditBtnLink = {link: '', text: ''};
  btnSecond: boolean = false;
  btnSecondLink: EditBtnLink = {link: '', text: ''};
  editBtnLinks: {[key: string]: EditBtnLink} = {
    lawyer_clients: {
      link: '/edit/lawyer/clients',
      text: 'Додати клієнта'
    },
    lawyer_client_work: {
      link: '/edit/lawyer/client_work',
      text: 'Додати роботу'
    },
    lawyer_subscribers: {
      link: '/edit/lawyer/subscribers',
      text: 'Додати абонента'
    },
    lawyer_subscriber_work: {
      link: '/edit/lawyer/subscriber_work',
      text: 'Додати роботу'
    },
    advocate_category: {
      link: '/edit/advocate_category',
      text: 'Додати категорію'
    },
    advocate_case: {
      link: '/edit/advocate_case',
      text: 'Додати справу'
    },
    advocate_work: {
      link: '/edit/advocate_work',
      text: 'Додати роботу'
    },
  };
  private subscription!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private mainService: MainService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.name = this.authService.getName();
    this.userType = sessionStorage.getItem('userType')
    this.buttonMainCheck();
    this.buttonSecondaryCheck();
  }

  buttonMainCheck(): void {
    this.subscription = this.mainService.getEditDataObservable().subscribe(
      (data: {type: string, id: number|null}) => {
        const btnType: string = data.type;
        if (btnType !== '') {
          this.btn = true;
          this.btnLink.link = this.editBtnLinks[btnType].link;
          this.btnLink.text = this.editBtnLinks[btnType].text;
          if (data.id !== null) {
            this.btnLink.link += '/' + data.id;
            this.btnLink.text = this.btnLink.text.replace('Додати ', 'Редагувати ');
          }
        } else {
          this.btn = false;
          this.btnLink = {link: '', text: ''};
        }
        this.cdr.detectChanges();
      }
    );
  }

  buttonSecondaryCheck(): void {
    this.subscription = this.mainService.getEditSecondaryDataObservable().subscribe(
      (data: {type: string, id: number|null}) => {
        const btnType: string = data.type;
        if (btnType !== '') {
          this.btnSecond = true;
          this.btnSecondLink.link = this.editBtnLinks[btnType].link;
          this.btnSecondLink.text = this.editBtnLinks[btnType].text;
          if (data.id !== null) {
            this.btnSecondLink.link += '/' + data.id;
            this.btnSecondLink.text = this.btnSecondLink.text.replace('Додати ', 'Редагувати ');
          }
        } else {
          this.btnSecond = false;
          this.btnSecondLink = {link: '', text: ''};
        }
        this.cdr.detectChanges();
      }
    );
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
