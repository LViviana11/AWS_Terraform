import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student-aws/student.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export default class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);



  students: any[] = [];

  ngOnInit(): void {
      this.studentService.getStudents()
      .subscribe((students: any) =>{
        this.students = students;
      });
  }

}
