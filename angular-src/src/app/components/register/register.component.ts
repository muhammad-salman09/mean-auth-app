import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { NgModel } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Injectable} from '@angular/core';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

name:String;
username:String;
email:String;
password:String;

  constructor(private validateService: ValidateService, private flashMessage:FlashMessagesService,
  private authService:AuthService,
  private router:Router) { }

  ngOnInit() {}

onRegisterSubmit(){
const user={

	name:this.name,
	username:this.username,
	email:this.email,
	password:this.password
	}
	
	if(!this.validateService.validateRegister(user)){
	this.flashMessage.show('please fill all the fields',{cssClass: 'alert-danger',timeout:3000});
	return false;

	}
	if(!this.validateService.validateEmail(user.email)){
	this.flashMessage.show('please use a valid email',{cssClass: 'alert-danger',timeout:3000});
	return false;
}
	//register user
	this.authService.registerUser(user).subscribe(data=>{
if(data.success){
	this.flashMessage.show('you ae now registered and can login',{cssClass: 'alert-success',timeout:3000});
	this.router.navigate(['login']);
}else{
this.flashMessage.show('something went wrong',{cssClass: 'alert-danger',timeout:3000});
	this.router.navigate(['register']);
	

}

	});
}
}
