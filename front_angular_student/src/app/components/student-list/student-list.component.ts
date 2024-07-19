import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student-aws/student.service';
import { RouterModule } from '@angular/router';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export default class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);



  students: Student[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.studentService.getStudents()
      .subscribe(students => {
        this.students = students;
      });
  }

  deleteStudent(student: Student) {
   this.studentService.deleteStudent(student.id)
    .subscribe(()=>{
      this.loadAll();
      
    });
  }

}
