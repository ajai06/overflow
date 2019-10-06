import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  submitted =  false;

  constructor(private formBuilder: FormBuilder,
              private questionsService: QuestionsService,
              private router: Router) {}

  askForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    question: ['', [Validators.required, Validators.minLength(10)]]
  });


  ngOnInit() {

  }

  get check() {
    return this.askForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.askForm.invalid) {
      return;
    } else {
      console.log(this.askForm.value);
      this.questionsService.askQuestion(this.askForm.value).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/my-questions');
        },
        err => {
           console.log(err);
        }
      );
    }
  }

}
