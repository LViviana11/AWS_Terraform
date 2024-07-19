import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/services/student-aws/student.service';
import { Student } from '../../../models/student.interface';

@Component({
  selector: 'app-form-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.css'
})
export default class FormCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private studentService = inject(StudentService);

  
  form? :FormGroup;
  student?: Student;

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');

    if(id){
      this.studentService.getStudent(id)
        .subscribe(student =>{
          this.student = student;
          this.form = this.fb.group({
            documentNumb: [student.documentNumb, [Validators.required]],
            firstName:[student.firstName, [Validators.required]],
            lastName: [student.lastName, [Validators.required]],
            career: [student.career,[Validators.required]],
            address: [student.address, [Validators.required]],
            phoneNumber: [student.phoneNumber, [Validators.required]],
            email: [student.email,[Validators.required, Validators.email]]
          });
        
        })
    }else{
      this.form = this.fb.group({
        documentNumb: ['', [Validators.required]],
        firstName:['', [Validators.required]],
        lastName: ['', [Validators.required]],
        career: ['',[Validators.required]],
        address: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['',[Validators.required,Validators.email]]
      });
    }
  }

  save() {

    if(this.form?.invalid){
      return;
    }
    const studentForm = this.form!.value;
    
    if(this.student){
      this.studentService.updateStudent(this.student.id, studentForm)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        console.error('Error al actualizar estudiante:', error); // Manejo de errores
      });

    }else{
      this.studentService.createStudent(studentForm)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        console.error('Error al crear estudiante:', error); // Manejo de errores
      });

    }
   
   
  }


}




