"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_detail_component_1 = require("./components/event-detail.component");
var social_share_module_1 = require("../social-share/social-share.module");
var register_attendee_component_1 = require("./components/register-attendee.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var forms_1 = require("@angular/forms");
var toggle_component_1 = require("./components/toggle.component");
var toggle_list_component_1 = require("./components/toggle-list.component");
var event_detail_tags_component_1 = require("./components/event-detail-tags.component");
var event_detail_attachments_component_1 = require("./components/event-detail-attachments.component");
var event_detail_target_audiences_component_1 = require("./components/event-detail-target-audiences.component");
var common_1 = require("@angular/common");
var calendar_event_list_common_module_1 = require("./calendar-event-list-common.module");
var safe_html_pipe_1 = require("../core/pipes/safe-html.pipe");
var modal_focus_directive_1 = require("../core/directives/modal-focus.directive");
var router_1 = require("@angular/router");
var CalendarEventListDetailModule = /** @class */ (function () {
    function CalendarEventListDetailModule() {
    }
    CalendarEventListDetailModule = __decorate([
        core_1.NgModule({
            declarations: [
                safe_html_pipe_1.SafeHtmlPipe,
                modal_focus_directive_1.ModalFocusDirective,
                event_detail_component_1.EventDetailComponent,
                event_detail_attachments_component_1.EventDetailAttachmentsComponent,
                event_detail_tags_component_1.EventDetailTagsComponent,
                event_detail_target_audiences_component_1.EventDetailTargetAudiencesComponent,
                register_attendee_component_1.RegisterAttendeeComponent,
                toggle_component_1.ToggleComponent,
                toggle_list_component_1.ToggleListComponent
            ],
            imports: [
                calendar_event_list_common_module_1.CalendarEventListCommonModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_bootstrap_1.ModalModule.forRoot(),
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                social_share_module_1.SocialShareModule
            ],
            providers: [],
            entryComponents: [register_attendee_component_1.RegisterAttendeeComponent],
            bootstrap: [],
        })
    ], CalendarEventListDetailModule);
    return CalendarEventListDetailModule;
}());
exports.CalendarEventListDetailModule = CalendarEventListDetailModule;
//# sourceMappingURL=calendar-event-list-detail.module.js.map