import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersArchiveComponent } from './subscribers-archive.component';

describe('SubscribersArchiveComponent', () => {
  let component: SubscribersArchiveComponent;
  let fixture: ComponentFixture<SubscribersArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribersArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribersArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
