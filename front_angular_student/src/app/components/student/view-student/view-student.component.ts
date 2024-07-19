import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/services/student-aws/student.service';
import { Student } from '../../../models/student.interface';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export default class ViewStudent implements OnInit {
  student: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadStudent(id);
      }
    });
  }

  loadStudent(id: string) {
    // Aquí llamas a tu servicio para obtener los detalles del estudiante por ID
    this.studentService.getStudent(id).subscribe(
      (student) => {
        this.student = student;
      },
      (error) => {
        console.error('Error loading student', error);
      }
    );
  }

}
