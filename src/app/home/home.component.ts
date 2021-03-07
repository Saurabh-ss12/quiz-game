import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isShowModal = false; // false
  isShowOptions = false; //false
  allChecked = false;
  allOptions = { 'difficult': false, 'medium': false, 'easy': false };
  dialogNumber = 1;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  showInfo() {
    this.isShowModal = true;
    if (!this.allChecked) {
      document.getElementById('timerbar').style.animation = "timer 8s infinite";
      this.startDialogs();
    }
    if (this.allChecked) {
      document.getElementsByClassName('info')[0].classList.add('pause');
      document.getElementById('go').classList.add('pause');
      document.getElementById('go').style.display = "none";
    }
  }

  startDialogs() {
    var inter = setInterval(() => {
      if (this.dialogNumber < 3) {
        this.dialogNumber++;
      } else {
        document.getElementById('timerbar').classList.add('pause');
        document.getElementById('go').style.display = "inline-block";
        document.getElementById('go').style.animation = "blink 2s infinite";
        clearInterval(inter);
      }
    }, 8000);
    // 8 sec
  }

  goOptions() {
    this.isShowModal = false;
    this.isShowOptions = true;
  }

  goTotutorial() {
    this.router.navigateByUrl('/tutorial');
  }

  checkRead(mode: String) {
    if (mode === 'difficult') {
      this.allOptions.difficult = true;
    } else if (mode === 'medium') {
      this.allOptions.medium = true;
    } else {
      this.allOptions.easy = true;
    }

    if (this.allOptions.difficult && this.allOptions.medium && this.allOptions.easy) {
      this.allChecked = true;
    }
  }
}