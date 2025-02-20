import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateWorksListComponent } from './advocate-works-list.component';

describe('AdvocateWorksListComponent', () => {
  let component: AdvocateWorksListComponent;
  let fixture: ComponentFixture<AdvocateWorksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvocateWorksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateWorksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
