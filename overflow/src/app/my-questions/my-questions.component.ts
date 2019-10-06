import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {

  questions = [];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.myQuestion();
  }

  myQuestion() {
    this.questionsService.myQuestions().subscribe(
      res => {
        this.questions = res.questions.data;
        console.log(res);
        },
      err => console.log(err)
    );
  }

}
