import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodasClasesPage } from './todas-clases.page';

describe('TodasClasesPage', () => {
  let component: TodasClasesPage;
  let fixture: ComponentFixture<TodasClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
