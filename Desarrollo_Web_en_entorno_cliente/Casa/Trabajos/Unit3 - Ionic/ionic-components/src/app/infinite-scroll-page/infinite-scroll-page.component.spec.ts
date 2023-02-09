import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfiniteScrollPageComponent } from './infinite-scroll-page.component';

describe('InfiniteScrollPageComponent', () => {
  let component: InfiniteScrollPageComponent;
  let fixture: ComponentFixture<InfiniteScrollPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfiniteScrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
