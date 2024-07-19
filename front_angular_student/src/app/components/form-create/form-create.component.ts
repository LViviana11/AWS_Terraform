import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../core/services/student-aws/student.service';

@Component({
  selector: 'app-form-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.css'
})
export default class FormCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private studentService = inject(StudentService);

  form= this.fb.group({
    documentNumb: ['',[Validators.required]],
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    career: ['',[Validators.required]],
    address: ['',[Validators.required]],
    phoneNumber: ['',[Validators.required]],
    email: ['',[Validators.required]]
  })

  create() {
    const student = this.form.value;
    console.log('Enviando estudiante:', student); // Añade este log para depurar
    this.studentService.createStudent(student)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        console.error('Error al crear estudiante:', error); // Manejo de errores
      });
  }
  

}




