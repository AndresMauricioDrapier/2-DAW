import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HorizontalScrollPageComponent } from './horizontal-scroll-page.component';

describe('HorizontalScrollPageComponent', () => {
  let component: HorizontalScrollPageComponent;
  let fixture: ComponentFixture<HorizontalScrollPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalScrollPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalScrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
