import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesCreadasPage } from './clases-creadas.page';

describe('ClasesCreadasPage', () => {
  let component: ClasesCreadasPage;
  let fixture: ComponentFixture<ClasesCreadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesCreadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
