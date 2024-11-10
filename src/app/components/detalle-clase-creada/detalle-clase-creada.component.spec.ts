import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleClaseCreadaComponent } from './detalle-clase-creada.component';

describe('DetalleClaseCreadaComponent', () => {
  let component: DetalleClaseCreadaComponent;
  let fixture: ComponentFixture<DetalleClaseCreadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleClaseCreadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleClaseCreadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
