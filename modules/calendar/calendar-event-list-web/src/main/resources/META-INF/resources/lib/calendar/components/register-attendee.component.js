"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var forms_1 = require("@angular/forms");
var DetailActions = require("../store/actions/event-detail.actions");
var store_1 = require("@ngrx/store");
var fromRoot = require("../store/store");
var core_1 = require("@angular/core");
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var ERROR_CODES = {
    EVENT_FULLY_BOOKED: 'EVENT_FULLY_BOOKED',
    ALREADY_REGISTERED: 'ALREADY_REGISTERED',
    MANDATORY_FIELD_MISSING: 'MANDATORY_FIELD_MISSING',
    INVALID_EMAIL: 'INVALID_EMAIL',
    MIN_NR_OF_ATTENDEES: 'MIN_NR_OF_ATTENDEES',
    MAX_NR_OF_ATTENDEES: 'MAX_NR_OF_ATTENDEES'
};
var RegisterAttendeeComponent = /** @class */ (function () {
    function RegisterAttendeeComponent(fb, store, bsModalRef, calendarEventListConfig) {
        this.fb = fb;
        this.store = store;
        this.bsModalRef = bsModalRef;
        this.calendarEventListConfig = calendarEventListConfig;
    }
    RegisterAttendeeComponent.prototype.ngOnInit = function () {
        this.init();
        this.calendarEvent$ = this.store.select(fromRoot.selectCalendarEvent).pipe(operators_1.share());
        this.detailError$ = this.store.select(fromRoot.selectDetailError).pipe(operators_1.share());
        this.attendee$ = this.store.select(fromRoot.selectAttendee).pipe(operators_1.share());
        this.subscribeDetailError();
        this.subscribeAttendee();
        this.subscribeCalendarEvent();
        this.privacyPolicyLink = this.calendarEventListConfig.getPrivacyPolicyLink();
    };
    RegisterAttendeeComponent.prototype.subscribeCalendarEvent = function () {
        var _this = this;
        var subscription = this.calendarEvent$.subscribe(function (calendarEvent) {
            if (calendarEvent) {
                _this.calendarEvent = calendarEvent;
                _this.attendeeForm = new forms_1.FormGroup({
                    firstName: new forms_1.FormControl(_this.attendee.firstName, [forms_1.Validators.required]),
                    lastName: new forms_1.FormControl(_this.attendee.lastName, [forms_1.Validators.required]),
                    email: new forms_1.FormControl(_this.attendee.email, [forms_1.Validators.required, forms_1.Validators.email]),
                    nrRegistered: new forms_1.FormControl(_this.attendee.nrRegistered, [
                        forms_1.Validators.max(calendarEvent.maxNrPerRegistration),
                        forms_1.Validators.min(1)
                    ])
                });
                if (calendarEvent.maxNrPerRegistration > 1) {
                    _this.showNrRegistered = true;
                }
            }
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    RegisterAttendeeComponent.prototype.subscribeAttendee = function () {
        var _this = this;
        var subscription = this.attendee$.subscribe(function (attendee) {
            if (attendee && _this.submitted && attendee.id) {
                _this.showOverlay = false;
                _this.successfullyRegistered = true;
                _this.modalHeaderElements = Array.prototype.slice.call(document.querySelectorAll('.modal-header button'));
                _this.closeBtnElement = _this.modalHeaderElements[0];
                _this.closeBtnElement.focus();
            }
            else {
                _this.successfullyRegistered = false;
            }
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    RegisterAttendeeComponent.prototype.subscribeDetailError = function () {
        var _this = this;
        var subscription = this.detailError$.subscribe(function (error) {
            if (error && _this.submitted) {
                _this.showOverlay = false;
                if (error.code === 'BAD_REQUEST_EMAIL_ALREADY_REGISTERED') {
                    _this.errorId = ERROR_CODES.ALREADY_REGISTERED;
                }
                else if (error.code === 'FORBIDDEN_MAXIMUM_ATTENDEES_REGISTERED') {
                    _this.errorId = ERROR_CODES.EVENT_FULLY_BOOKED;
                }
                else {
                    _this.errorId = error.code;
                }
            }
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    RegisterAttendeeComponent.prototype.onSubmit = function () {
        if (this.attendeeForm.valid) {
            this.submitted = true;
            this.errorId = null;
            this.showOverlay = true;
            this.store.dispatch(new DetailActions.AddAttendee(this.attendeeForm.value));
            this.attendeeForm.reset();
            this.acceptTerms = false;
        }
        else {
            if (this.attendeeForm.get('firstName').hasError('required') ||
                this.attendeeForm.get('lastName').hasError('required') ||
                this.attendeeForm.get('email').hasError('required')) {
                this.errorId = ERROR_CODES.MANDATORY_FIELD_MISSING;
            }
            else if (this.attendeeForm.get('email').hasError('email')) {
                this.errorId = ERROR_CODES.INVALID_EMAIL;
            }
            else if (this.attendeeForm.get('nrRegistered').hasError('min')) {
                this.errorId = ERROR_CODES.MIN_NR_OF_ATTENDEES;
            }
            else if (this.attendeeForm.get('nrRegistered').hasError('max')) {
                this.errorId = ERROR_CODES.MAX_NR_OF_ATTENDEES;
            }
        }
    };
    RegisterAttendeeComponent.prototype.onClose = function () {
        this.init();
        this.submitted = true;
        this.bsModalRef.hide();
    };
    RegisterAttendeeComponent.prototype.init = function () {
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
    };
    RegisterAttendeeComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"arena-event-registration\" tabindex=\"-1\" role=\"dialog\"  [attr.aria-labelledby]=\"textTitle.id\">\n            <div class=\"modal-header\">\n                <h4 #textTitle class=\"modal-title pull-left\" i18n=\"@@lblRegisterToEvent\">Register to event: {{calendarEvent?.title}}</h4>\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"onClose()\" appModalFocus>\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <div *ngIf=\"showOverlay\" class=\"event-registration-overlay\"></div>\n                <div *ngIf=\"errorId\" role=\"alert\" class=\"alert alert-danger\" i18n=\"@@msgRegistrationError\">{errorId, select,\n                        MANDATORY_FIELD_MISSING {Mandatory fields are missing}\n                        INVALID_EMAIL {Email is invalid}\n                        EVENT_FULLY_BOOKED {Event is fully booked}\n                        ALREADY_REGISTERED {This email is already registered}\n                        MIN_NR_OF_ATTENDEES {You can not register less than one person} \n                        MAX_NR_OF_ATTENDEES {You are trying to register too many attendees}\n                        other {Failed to register to the event}}\n                </div>\n                <div role=\"alert\" class=\"alert alert-info\" *ngIf=\"successfullyRegistered\" i18n=\"@@msgRegisterSuccess\">Successfully\n                    registered to the event\n                </div>\n                <form [formGroup]=\"attendeeForm\" (ngSubmit)=\"onSubmit()\" *ngIf=\"!submitted\"  #formDir=\"ngForm\">\n                    <div class=\"form-group\">\n                        <label [attr.for]=\"inputFirstName.id\" title=\"First Name\" i18n=\"@@fldFirstName.label\"\n                               i18n-title=\"@@fldFirstName.title\">First Name</label>\n                        <input #inputFirstName class=\"form-control\" formControlName=\"firstName\" aria-required=\"true\" appModalFocus>\n                    </div>\n                    \n                    <div class=\"form-group\">\n                        <label [attr.for]=\"inputLastName.id\" title=\"Last Name\" i18n=\"@@fldLastName.label\"\n                               i18n-title=\"@@fldLastName.title\">Last Name</label>\n                        <input #inputLastName class=\"form-control\" formControlName=\"lastName\" aria-required=\"true\" appModalFocus>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label [attr.for]=\"inputEmail.id\" title=\"Email\" i18n=\"@@fldEmail.label\"\n                               i18n-title=\"@@fldEmail.title\">Email</label>\n                        <input #inputEmail class=\"form-control\" formControlName=\"email\" aria-required=\"true\" appModalFocus>\n                    </div>\n\n                    <div *ngIf=\"showNrRegistered\" class=\"form-group\">\n                        <label [attr.for]=\"inputNrRegistered.id\" title=\"Number of guests\" i18n=\"@@fldNrRegistered.label\"\n                               i18n-title=\"@@fldNrRegistered.title\">Number of guests ({{calendarEvent?.maxNrPerRegistration}} allowed)</label>\n                        <input type=\"number\" min=\"1\" max=\"{{calendarEvent?.maxNrPerRegistration}}\" #inputNrRegistered class=\"form-control\" formControlName=\"nrRegistered\" aria-required=\"true\" appModalFocus>\n                    </div>\n                    \n                    <div class=\"form-group form-check\">\n                        <input #checkBoxAcceptTerms type=\"checkbox\" [(ngModel)]=\"acceptTerms\"  [ngModelOptions]=\"{standalone: true}\" class=\"form-check-input\"  aria-required=\"true\" >\n                        &nbsp;\n                        <label [attr.for]=\"checkBoxAcceptTerms.id\" class=\"form-check-label\" style=\"display: inline\" i18n=\"@@fldAcceptTerms.label\" title=\"I agree with the storage and handling of data by this website in accordance to the policy: \"  i18n-title=\"@@fldAcceptTerms.title\">\n                            I agree with the storage and handling of data by this website in accordance to this policy:\n                        </label>\n                        <a class=\"nav-link\" i18n=\"@@fldPrivacyPolicy.label\" style=\"display: inline\" title=\"Privacy Policy\" tabindex=\"-1\" i18n-title=\"@@fldPrivacyPolicy.title\" target=\"_blank\" [href]=\"privacyPolicyLink\">Privacy policy</a>\n                    </div>\n                    \n                    <div class=\"form-group form-check\">\n                    <label  i18n=\"@@fldPreRegSameEmailWillBeRemoved.label\" title=\"If you have a previous registration for the same e-mail address that will be removed.\"  i18n-title=\"@@fldPreRegSameEmailWillBeRemoved.title\">\n                        If you have a previous registration for the same e-mail address that will be removed.\n                    </label>\n                    </div>\n                    \n                    <div class=\"form-row justify-content-end\">\n                        <button (click)=\"onClose()\" class=\"btn btn-secondary mr-2\" title=\"Cancel\"\n                                i18n=\"@@btnCancel.label\"\n                                i18n-title=\"@@btnCancel.label\">Cancel\n                        </button>\n                        <button type=\"submit\" [disabled]=\"!acceptTerms\" class=\"btn btn-primary\" title=\"Register\" i18n=\"@@btnRegister.label\"\n                                i18n-title=\"@@btnRegister.title\">Register\n                        </button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, store_1.Store, ngx_bootstrap_1.BsModalRef, calendar_event_list_config_1.CalendarEventListConfig])
    ], RegisterAttendeeComponent);
    return RegisterAttendeeComponent;
}());
exports.RegisterAttendeeComponent = RegisterAttendeeComponent;
//# sourceMappingURL=register-attendee.component.js.map