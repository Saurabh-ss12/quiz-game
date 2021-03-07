import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  page = 1;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  changePage(mode: String) {
    if (mode === 'next' && this.page < 4) {
      ++this.page;
      if (this.page === 4) {
        document.getElementById('proceed').style.animation = 'blink 2s infinite';
      }
    } else if (this.page > 1) {
      --this.page;
    }
    console.log(this.page);
  }

  startQuiz() {
    this.router.navigateByUrl('quiz');
  }

}
