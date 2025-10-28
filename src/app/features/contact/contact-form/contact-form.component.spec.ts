import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización del formulario', () => {
    it('debe crear el formulario con 3 campos', () => {
      expect(component.contactForm.contains('name')).toBeTruthy();
      expect(component.contactForm.contains('email')).toBeTruthy();
      expect(component.contactForm.contains('message')).toBeTruthy();
    });

    it('debe inicializar con valores vacíos', () => {
      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('message')?.value).toBe('');
    });

    it('debe inicializar submitted como false', () => {
      expect(component.submitted).toBe(false);
    });
  });

  describe('Validaciones del campo name', () => {
    it('debe ser requerido', () => {
      const nameControl = component.contactForm.get('name');
      nameControl?.setValue('');
      expect(nameControl?.hasError('required')).toBeTruthy();
    });

    it('debe requerir mínimo 2 caracteres', () => {
      const nameControl = component.contactForm.get('name');
      nameControl?.setValue('A');
      expect(nameControl?.hasError('minlength')).toBeTruthy();
    });

    it('debe ser válido con 2 o más caracteres', () => {
      const nameControl = component.contactForm.get('name');
      nameControl?.setValue('Juan');
      expect(nameControl?.valid).toBeTruthy();
    });
  });

  describe('Validaciones del campo email', () => {
    it('debe ser requerido', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('');
      expect(emailControl?.hasError('required')).toBeTruthy();
    });

    it('debe validar formato de email', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();
    });

    it('debe ser válido con un email correcto', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('test@example.com');
      expect(emailControl?.valid).toBeTruthy();
    });
  });

  describe('Validaciones del campo message', () => {
    it('debe ser requerido', () => {
      const messageControl = component.contactForm.get('message');
      messageControl?.setValue('');
      expect(messageControl?.hasError('required')).toBeTruthy();
    });

    it('debe requerir mínimo 10 caracteres', () => {
      const messageControl = component.contactForm.get('message');
      messageControl?.setValue('Corto');
      expect(messageControl?.hasError('minlength')).toBeTruthy();
    });

    it('debe ser válido con 10 o más caracteres', () => {
      const messageControl = component.contactForm.get('message');
      messageControl?.setValue('Este es un mensaje válido');
      expect(messageControl?.valid).toBeTruthy();
    });
  });

  describe('Envío del formulario', () => {
    it('NO debe enviar si el formulario es inválido', () => {
      spyOn(console, 'log');
      spyOn(window, 'alert');

      component.onSubmit();

      expect(component.submitted).toBeTruthy();
      expect(console.log).not.toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('debe enviar si el formulario es válido', () => {
      spyOn(console, 'log');
      spyOn(window, 'alert');

      component.contactForm.setValue({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        message: 'Este es un mensaje de prueba',
      });

      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith('Formulario enviado:', {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        message: 'Este es un mensaje de prueba',
      });
      expect(window.alert).toHaveBeenCalledWith('¡Mensaje enviado con éxito!');
      expect(component.submitted).toBe(false);
    });

    it('debe resetear el formulario después de enviar', () => {
      spyOn(window, 'alert');

      component.contactForm.setValue({
        name: 'Juan',
        email: 'juan@test.com',
        message: 'Mensaje de prueba válido',
      });

      component.onSubmit();

      expect(component.contactForm.get('name')?.value).toBeNull();
      expect(component.contactForm.get('email')?.value).toBeNull();
      expect(component.contactForm.get('message')?.value).toBeNull();
      expect(component.submitted).toBe(false);
    });
  });

  describe('Getter de controles', () => {
    it('debe retornar los controles del formulario', () => {
      const controls = component.f;
      expect(controls['name']).toBeTruthy();
      expect(controls['email']).toBeTruthy();
      expect(controls['message']).toBeTruthy();
    });
  });
});
