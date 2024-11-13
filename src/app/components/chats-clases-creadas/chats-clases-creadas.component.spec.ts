import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatsClasesCreadasComponent } from './chats-clases-creadas.component';

describe('ChatsClasesCreadasComponent', () => {
  let component: ChatsClasesCreadasComponent;
  let fixture: ComponentFixture<ChatsClasesCreadasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsClasesCreadasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsClasesCreadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
