import {share} from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as DetailActions from '../store/actions/event-detail.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import {Observable, Subscription} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from '../models/calendar-event';
import {Attendee} from '../models/attendee';
import {Error} from '../models/error';
import {CalendarEventListConfig} from '../calendar-event-list-config';

const ERROR_CODES = {
    EVENT_FULLY_BOOKED: 'EVENT_FULLY_BOOKED',
    ALREADY_REGISTERED: 'ALREADY_REGISTERED',
    MANDATORY_FIELD_MISSING: 'MANDATORY_FIELD_MISSING',
    INVALID_EMAIL: 'INVALID_EMAIL',
    MIN_NR_OF_ATTENDEES: 'MIN_NR_OF_ATTENDEES',
    MAX_NR_OF_ATTENDEES: 'MAX_NR_OF_ATTENDEES'
};

@Component({
    template: `
        <div class="arena-event-registration" tabindex="-1" role="dialog"  [attr.aria-labelledby]="textTitle.id">
            <div class="modal-header">
                <h4 #textTitle class="modal-title pull-left" i18n="@@lblRegisterToEvent">Register to event: {{calendarEvent?.title}}</h4>
                <button type="button" class="close pull-right" aria-label="Close" (click)="onClose()" appModalFocus>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div *ngIf="showOverlay" class="event-registration-overlay"></div>
                <div *ngIf="errorId" role="alert" class="alert alert-danger" i18n="@@msgRegistrationError">{errorId, select,
                        MANDATORY_FIELD_MISSING {Mandatory fields are missing}
                        INVALID_EMAIL {Email is invalid}
                        EVENT_FULLY_BOOKED {Event is fully booked}
                        ALREADY_REGISTERED {This email is already registered}
                        MIN_NR_OF_ATTENDEES {You can not register less than one person} 
                        MAX_NR_OF_ATTENDEES {You are trying to register too many attendees}
                        other {Failed to register to the event}}
                </div>
                <div role="alert" class="alert alert-info" *ngIf="successfullyRegistered" i18n="@@msgRegisterSuccess">Successfully
                    registered to the event
                </div>
                <form [formGroup]="attendeeForm" (ngSubmit)="onSubmit()" *ngIf="!submitted"  #formDir="ngForm">
                    <div class="form-group">
                        <label [attr.for]="inputFirstName.id" title="First Name" i18n="@@fldFirstName.label"
                               i18n-title="@@fldFirstName.title">First Name</label>
                        <input #inputFirstName class="form-control" formControlName="firstName" aria-required="true" appModalFocus>
                    </div>
                    
                    <div class="form-group">
                        <label [attr.for]="inputLastName.id" title="Last Name" i18n="@@fldLastName.label"
                               i18n-title="@@fldLastName.title">Last Name</label>
                        <input #inputLastName class="form-control" formControlName="lastName" aria-required="true" appModalFocus>
                    </div>

                    <div class="form-group">
                        <label [attr.for]="inputEmail.id" title="Email" i18n="@@fldEmail.label"
                               i18n-title="@@fldEmail.title">Email</label>
                        <input #inputEmail class="form-control" formControlName="email" aria-required="true" appModalFocus>
                    </div>

                    <div *ngIf="showNrRegistered" class="form-group">
                        <label [attr.for]="inputNrRegistered.id" title="Number of guests" i18n="@@fldNrRegistered.label"
                               i18n-title="@@fldNrRegistered.title">Number of guests ({{calendarEvent?.maxNrPerRegistration}} allowed)</label>
                        <input type="number" min="1" max="{{calendarEvent?.maxNrPerRegistration}}" #inputNrRegistered class="form-control" formControlName="nrRegistered" aria-required="true" appModalFocus>
                    </div>
                    
                    <div class="form-group form-check">
                        <input #checkBoxAcceptTerms type="checkbox" [(ngModel)]="acceptTerms"  [ngModelOptions]="{standalone: true}" class="form-check-input"  aria-required="true" >
                        &nbsp;
                        <label [attr.for]="checkBoxAcceptTerms.id" class="form-check-label" style="display: inline" i18n="@@fldAcceptTerms.label" title="I agree with the storage and handling of data by this website in accordance to the policy: "  i18n-title="@@fldAcceptTerms.title">
                            I agree with the storage and handling of data by this website in accordance to this policy:
                        </label>
                        <a class="nav-link" i18n="@@fldPrivacyPolicy.label" style="display: inline" title="Privacy Policy" tabindex="-1" i18n-title="@@fldPrivacyPolicy.title" target="_blank" [href]="privacyPolicyLink">Privacy policy</a>
                    </div>
                    
                    <div class="form-group form-check">
                    <label  i18n="@@fldPreRegSameEmailWillBeRemoved.label" title="If you have a previous registration for the same e-mail address that will be removed."  i18n-title="@@fldPreRegSameEmailWillBeRemoved.title">
                        If you have a previous registration for the same e-mail address that will be removed.
                    </label>
                    </div>
                    
                    <div class="form-row justify-content-end">
                        <button (click)="onClose()" class="btn btn-secondary mr-2" title="Cancel"
                                i18n="@@btnCancel.label"
                                i18n-title="@@btnCancel.label">Cancel
                        </button>
                        <button type="submit" [disabled]="!acceptTerms" class="btn btn-primary" title="Register" i18n="@@btnRegister.label"
                                i18n-title="@@btnRegister.title">Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
})

export class RegisterAttendeeComponent implements OnInit {
    calendarEvent: CalendarEvent;
    calendarEvent$: Observable<CalendarEvent>;
    attendeeForm: FormGroup;
    attendee: Attendee;
    detailError$: Observable<Error>;
    attendee$: Observable<Attendee>;
    successfullyRegistered: boolean;
    errorId: string;
    submitted: boolean;
    showOverlay: boolean;
    showNrRegistered: boolean;
    acceptTerms: boolean;
    privacyPolicyLink: string;
    modalHeaderElements: Array<HTMLInputElement>;
    closeBtnElement: HTMLInputElement;

    constructor(private fb: FormBuilder, private store: Store<fromRoot.State>, public bsModalRef: BsModalRef, private calendarEventListConfig: CalendarEventListConfig) {
    }

    ngOnInit(): void {
        this.init();
        this.calendarEvent$ = this.store.select(fromRoot.selectCalendarEvent).pipe(share());
        this.detailError$ = this.store.select(fromRoot.selectDetailError).pipe(share());
        this.attendee$ = this.store.select(fromRoot.selectAttendee).pipe(share());
        this.subscribeDetailError();
        this.subscribeAttendee();
        this.subscribeCalendarEvent();
        this.privacyPolicyLink = this.calendarEventListConfig.getPrivacyPolicyLink();
    }

    private subscribeCalendarEvent() {
        const subscription: Subscription = this.calendarEvent$.subscribe((calendarEvent: CalendarEvent) => {
                if (calendarEvent) {
                    this.calendarEvent = calendarEvent;
                    this.attendeeForm = new FormGroup({
                        firstName: new FormControl(this.attendee.firstName, [Validators.required]),
                        lastName: new FormControl(this.attendee.lastName, [Validators.required]),
                        email: new FormControl(this.attendee.email, [Validators.required, Validators.email]),
                        nrRegistered: new FormControl(this.attendee.nrRegistered, [
                            Validators.max(calendarEvent.maxNrPerRegistration),
                            Validators.min(1)])
                    });
                    if (calendarEvent.maxNrPerRegistration > 1) {
                        this.showNrRegistered = true;
                    }
                }
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }

    private subscribeAttendee() {
        const subscription: Subscription = this.attendee$.subscribe((attendee: Attendee) => {
                if (attendee && this.submitted && attendee.id) {
                    this.showOverlay = false;
                    this.successfullyRegistered = true;
                    this.modalHeaderElements = Array.prototype.slice.call(document.querySelectorAll('.modal-header button'));
                    this.closeBtnElement =  this.modalHeaderElements[0];
                    this.closeBtnElement.focus();
                } else {
                    this.successfullyRegistered = false;
                }
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }

    private subscribeDetailError() {
        const subscription: Subscription = this.detailError$.subscribe((error: Error) => {
                if (error && this.submitted) {
                    this.showOverlay = false;
                    if (error.code === 'BAD_REQUEST_EMAIL_ALREADY_REGISTERED') {
                        this.errorId = ERROR_CODES.ALREADY_REGISTERED;
                    } else if (error.code === 'FORBIDDEN_MAXIMUM_ATTENDEES_REGISTERED') {
                        this.errorId = ERROR_CODES.EVENT_FULLY_BOOKED;
                    } else {
                        this.errorId = error.code;
                    }
                }
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }

    onSubmit() {
        if (this.attendeeForm.valid) {
            this.submitted = true;
            this.errorId = null;
            this.showOverlay = true;
            this.store.dispatch(new DetailActions.AddAttendee(this.attendeeForm.value as Attendee));
            this.attendeeForm.reset();
            this.acceptTerms = false;
        } else {
            if (this.attendeeForm.get('firstName').hasError('required') ||
                this.attendeeForm.get('lastName').hasError('required') ||
                this.attendeeForm.get('email').hasError('required')) {
                this.errorId = ERROR_CODES.MANDATORY_FIELD_MISSING;
            } else if (this.attendeeForm.get('email').hasError('email')) {
                this.errorId = ERROR_CODES.INVALID_EMAIL;
            } else if (this.attendeeForm.get('nrRegistered').hasError('min')) {
                this.errorId = ERROR_CODES.MIN_NR_OF_ATTENDEES;
            } else if (this.attendeeForm.get('nrRegistered').hasError('max')) {
                this.errorId = ERROR_CODES.MAX_NR_OF_ATTENDEES;
            }
        }
    }

    onClose() {
        this.init();
        this.submitted = true;
        this.bsModalRef.hide();
    }

    init() {
        this.submitted = false;
        this.successfullyRegistered = false;
        this.showOverlay = false;
        this.showNrRegistered = false;
        this.errorId = '';
        this.attendee = {
            firstName: '',
            lastName: '',
            email: '',
            nrRegistered: 1
        };
    }
}
