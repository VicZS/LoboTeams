import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatsClasesInscritasComponent } from './chats-clases-inscritas.component';

describe('ChatsClasesInscritasComponent', () => {
  let component: ChatsClasesInscritasComponent;
  let fixture: ComponentFixture<ChatsClasesInscritasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsClasesInscritasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsClasesInscritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
