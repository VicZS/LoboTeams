import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleClaseInscritaComponent } from './detalle-clase-inscrita.component';

describe('DetalleClaseInscritaComponent', () => {
  let component: DetalleClaseInscritaComponent;
  let fixture: ComponentFixture<DetalleClaseInscritaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleClaseInscritaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleClaseInscritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
