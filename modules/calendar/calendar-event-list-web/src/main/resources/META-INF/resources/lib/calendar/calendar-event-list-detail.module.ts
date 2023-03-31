import {NgModule} from '@angular/core';
import {EventDetailComponent} from './components/event-detail.component';
import {SocialShareModule} from '../social-share/social-share.module';
import {RegisterAttendeeComponent} from './components/register-attendee.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToggleComponent} from './components/toggle.component';
import {ToggleListComponent} from './components/toggle-list.component';
import {EventDetailTagsComponent} from './components/event-detail-tags.component';
import {EventDetailAttachmentsComponent} from './components/event-detail-attachments.component';
import {EventDetailTargetAudiencesComponent} from './components/event-detail-target-audiences.component';
import {CommonModule} from '@angular/common';
import {CalendarEventListCommonModule} from './calendar-event-list-common.module';
import {SafeHtmlPipe} from '../core/pipes/safe-html.pipe';
import {ModalFocusDirective} from '../core/directives/modal-focus.directive';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        ModalFocusDirective,
        EventDetailComponent,
        EventDetailAttachmentsComponent,
        EventDetailTagsComponent,
        EventDetailTargetAudiencesComponent,
        RegisterAttendeeComponent,
        ToggleComponent,
        ToggleListComponent
    ],
    imports: [
        CalendarEventListCommonModule,
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        SocialShareModule
    ],
    providers: [],
    entryComponents: [RegisterAttendeeComponent],
    bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
})

export class CalendarEventListDetailModule {
}

