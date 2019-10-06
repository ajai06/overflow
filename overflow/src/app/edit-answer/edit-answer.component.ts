import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private questionsService: QuestionsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  submitted = false;
  id;
  answers;

  editForm = this.formBuilder.group({
    answer: ['', [Validators.required]]
  });

  ngOnInit() {
    this.getAnswer();
    console.log(this.id);
  }

  get check() {
    return this.editForm.controls;
  }

  getAnswer() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.questionsService.getQuestion(this.id).subscribe(
      res => {
        console.log(res);
        this.answers = res.answers;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    } else {
      this.questionsService.editAnswer(this.id, this.editForm.value).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
