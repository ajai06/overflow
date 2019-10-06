import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-my-answers',
  templateUrl: './my-answers.component.html',
  styleUrls: ['./my-answers.component.css']
})
export class MyAnswersComponent implements OnInit {

  questions = [];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.myAnswer();
  }

  myAnswer() {
    this.questionsService.myAnswers().subscribe(
      res => {
        this.questions = res.questions.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
