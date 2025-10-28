import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Renderizado de enlace', () => {
    it('debe renderizar un enlace cuando se proporciona routerLink', () => {
      component.routerLink = '/test';
      component.text = 'Click me';
      fixture.detectChanges();

      const link = compiled.querySelector('a');
      expect(link).toBeTruthy();
      expect(link?.textContent?.trim()).toBe('Click me');
    });

    it('debe aplicar la clase CSS correcta al enlace', () => {
      component.routerLink = '/test';
      component.buttonClass = 'btn-primary';
      fixture.detectChanges();

      const link = compiled.querySelector('a');
      expect(link?.classList.contains('btn-primary')).toBeTruthy();
    });

    it('debe aplicar aria-label al enlace', () => {
      component.routerLink = '/test';
      component.ariaLabel = 'Ir a página de prueba';
      fixture.detectChanges();

      const link = compiled.querySelector('a');
      expect(link?.getAttribute('aria-label')).toBe('Ir a página de prueba');
    });
  });

  describe('Renderizado de botón', () => {
    it('debe renderizar un botón cuando NO se proporciona routerLink', () => {
      component.routerLink = undefined;
      component.text = 'Submit';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.textContent?.trim()).toBe('Submit');
    });

    it('debe aplicar el tipo correcto al botón', () => {
      component.type = 'submit';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.getAttribute('type')).toBe('submit');
    });

    it('debe deshabilitar el botón cuando disabled es true', () => {
      component.disabled = true;
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });

    it('debe aplicar la clase CSS correcta al botón', () => {
      component.buttonClass = 'btn-secondary';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.classList.contains('btn-secondary')).toBeTruthy();
    });
  });

  describe('Valores por defecto', () => {
    it('debe tener valores por defecto correctos', () => {
      expect(component.type).toBe('button');
      expect(component.buttonClass).toBe('btn-primary');
      expect(component.disabled).toBe(false);
    });
  });
});
