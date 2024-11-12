import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleActividadCreadaComponent } from './detalle-actividad-creada.component';

describe('DetalleActividadCreadaComponent', () => {
  let component: DetalleActividadCreadaComponent;
  let fixture: ComponentFixture<DetalleActividadCreadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleActividadCreadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleActividadCreadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
