import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadPage } from './actividad.page';
import { NonNullableFormBuilder } from '@angular/forms';

describe('ActividadPage', () => {
  let component: ActividadPage;
  let fixture: ComponentFixture<ActividadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
