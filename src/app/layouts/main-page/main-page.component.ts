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
  preloader: boolean = false;
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
    user: {
      link: '/edit/user',
      text: 'Додати користувача'
    },
  };
  private subscription!: Subscription;
  private subscription2!: Subscription;
  private subPreloader!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private mainService: MainService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.name = this.authService.getName();
    this.userType = sessionStorage.getItem('userType')
    this.preloader = true;
    this.preloaderCheck();
  }

  preloaderCheck(): void {
    this.subPreloader = this.mainService.getPreloaderStateObservable().subscribe(
      (state: boolean) => {
        this.preloader = state;
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
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subPreloader) {
      this.subPreloader.unsubscribe();
    }
  }
}
