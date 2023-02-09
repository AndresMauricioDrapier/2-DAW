import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualScrollPageComponent } from './virtual-scroll-page.component';

describe('VirtualScrollPageComponent', () => {
  let component: VirtualScrollPageComponent;
  let fixture: ComponentFixture<VirtualScrollPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualScrollPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualScrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
