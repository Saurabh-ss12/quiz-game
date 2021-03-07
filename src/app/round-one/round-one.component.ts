import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-one',
  templateUrl: './round-one.component.html',
  styleUrls: ['./round-one.component.scss']
})
export class RoundOneComponent implements OnInit {
  roundNumber = 1;
  header = 'Round 1';
  showPlayOptions = false;
  mode: string = '';
  count = 5;
  counter = false;
  questionCounter = 5;
  answerCounter = 10;
  quizSet = 1;
  quizMode = false;
  showAnswers = false;
  AskForNext = false;
  roundEnded = false;
  finish = false;
  answer = false;
  selectedId = 0;

  correctAnswer;
  wrongAnswer;
  noAnswer;

  netScore = 0;
  constructor() { }

  ngOnInit() {
    this.flow();
  }

  flow() {
    document.getElementById('head').style.setProperty('--animate-duration', '2s');
    setTimeout(() => {
      if (this.roundNumber === 1) {
        this.header = 'Relationship Trivia';
      } else if (this.roundNumber === 2) {
        this.header = 'Convos';
      } else {
        this.header = 'Choices';
      }
      document.getElementById('head').style.animation = 'up 1s forwards';
      document.getElementById('play').style.setProperty('--animate-duration', '2s');
      this.showPlayOptions = true;
    }, 2000);
  }

  setMode(mode: string) {
    this.counter = true;
    this.mode = mode;
    this.showPlayOptions = false;
    var inter = setInterval(() => {
      if (this.count > 1) {
        --this.count;
      } else {
        this.counter = false;
        this.quizMode = true;
        this.startQuestionTimer();
        clearInterval(inter);
      }
    }, 1000);
  }

  startQuestionTimer() {
    this.showAnswers = false;
    this.questionCounter = 5;
    var inter = setInterval(() => {
      if (this.questionCounter > 1) {
        --this.questionCounter;
      } else {
        clearInterval(inter);
        this.showAnswers = true;
        this.startAnswerTimer();
      }
    }, 1000);
  }

  startAnswerTimer() {
    this.showAnswers = true;
    this.answerCounter = 10;
    document.getElementById('bar').style.animation = 'answerAnime 10s forwards';
    var inter = setInterval(() => {
      if (this.answerCounter > 1) {
        --this.answerCounter;
      } else {
        clearInterval(inter);
        if (this.quizSet < 7) {
          this.checkScore();
          this.AskForNext = true;
        } else {
          // end this round
          this.checkScore();
          this.roundEnded = true;
          if (this.roundNumber === 3) {
            this.finish = true;
          }
        }
      }
    }, 1000);
  }

  nextQuestion() {
    this.AskForNext = false;
    this.quizSet++;
    this.selectedId = 0;
    document.getElementById('bar').style.animation = 'none';
    this.startQuestionTimer();
  }

  checkScore() {
    console.log('checked');
    if (this.mode === 'difficult') {
      this.correctAnswer = 5;
      this.wrongAnswer = -3;
      this.noAnswer = 0;
    } else if (this.mode === 'medium') {
      this.correctAnswer = 3;
      this.wrongAnswer = -1;
      this.noAnswer = 0;
    } else {
      this.correctAnswer = 2;
      this.wrongAnswer = 0;
      this.noAnswer = 0;
    }

    // correct answer
    if (this.answer) {
      console.log('correct');
      this.netScore = this.netScore + this.correctAnswer;
    }
    // wrong answer
    else {
      console.log('wrong');
      this.netScore = this.netScore + this.wrongAnswer;
    }
  }

  select(id, answer = 0) {
    this.selectedId = id;
    if (answer === 1) {
      this.answer = true;
    } else {
      this.answer = false;
    }
  }

  NextRound() {
    this.roundNumber++;
    this.reset();
  }

  reset() {
    this.showPlayOptions = false;
    this.mode = '';
    this.count = 5;
    this.counter = false;
    this.questionCounter = 5;
    this.answerCounter = 10;
    this.quizSet = 1;
    this.quizMode = false;
    this.showAnswers = false;
    this.AskForNext = false;
    this.roundEnded = false;
    this.answer = false;
    this.selectedId = 0;
    document.getElementById('head').style.animation = 'none';
    document.getElementById('bar').style.animation = 'none';
    document.getElementById('play').style.animation = 'none';

    this.correctAnswer = null;
    this.wrongAnswer = null;
    this.noAnswer = null;
    if (this.roundNumber === 2) {
      this.header = 'Round 2';
    } else if (this.roundNumber === 3) {
      this.header = 'Round 3';
    }
    this.flow();
  }
}
