import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { PostAnswerComponent } from './post-answer/post-answer.component';
import { AuthService } from './auth.service';
import { QuestionsService } from './questions.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyAnswersComponent } from './my-answers/my-answers.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    LoginComponent,
    RegisterComponent,
    AskQuestionComponent,
    PostQuestionComponent,
    PostAnswerComponent,
    MyQuestionsComponent,
    MyAnswersComponent,
    EditAnswerComponent,
    EditQuestionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [AuthService, QuestionsService, AuthGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true

              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
