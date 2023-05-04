import { Component, OnInit } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json'
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  
  
  titles: string ='';
  
  questions: any;
  questionsSelected: any;

  answers:string[] = [];
  answersSelected: string = '';

  questionsIndex:number = 0;
  questionMaxIndex:number = 0;
  
  options:any;
  
  finished: boolean = false;

  counter:number = 0;

  constructor(){ }
  
  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.titles = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionsSelected = quizz_questions.questions[this.questionsIndex]
      
      this.questionsIndex = 0;
      this.questionMaxIndex = this.questions.length;

    }
  }

  buttonPress(alias:string):void {
    this.answers.push(alias)
    this.nextStep()
    console.log(this.answers)
    console.log(this.questionsIndex)
  }

  async nextStep(){
    this.questionsIndex+=1

    if(this.questionMaxIndex > this.questionsIndex){
      this.questionsSelected = this.questions[this.questionsIndex];
    }else{
      const finalAwnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      this.answersSelected = quizz_questions.results[finalAwnswer as keyof typeof quizz_questions.results]
      console.log(finalAwnswer)
    }
  }
  async checkResult(answers:string[]){
    const result = answers.reduce((previus, current, i, arr) =>{
      if(
        arr.filter(item => item===previus).length > 
        arr.filter(item => item === current).length
      ){
        return previus
      }else{
        return current
      }
    })
    return result
  }
}
