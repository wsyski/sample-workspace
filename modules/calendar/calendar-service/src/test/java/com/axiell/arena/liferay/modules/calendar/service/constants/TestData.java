package com.axiell.arena.liferay.modules.calendar.service.constants;

import com.axiell.arena.liferay.modules.calendar.model.event.ByMonthDay;
import com.axiell.arena.liferay.modules.calendar.model.event.Image;
import com.axiell.arena.liferay.modules.calendar.model.event.Location;
import com.axiell.arena.liferay.modules.calendar.model.event.TargetAudience;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.RecurringDTO;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TestData {

    public static final String[] WEEKLY_RECURRING_BY_DAY = {"MO", "FR"};
    public static final String[] MONTHLY_RECURRING_BY_DAY = {"3SA"};
    public static final String ATTENDEE_FIRSTNAME = "John";
    public static final String ATTENDEE_EMAIL = "test@axiell.com";
    public static final String ATTENDEE_ID = "1234";
    public static final String ATTENDEE_LASTNAME = "Doe";
    public static final String IMAGE_CAPTION = "A beaufiful image";
    public static final String ERROR_MESSAGE = "Error message";
    public static final String ATTENDEE_ID2 = "5ca7197a85879d597df27cd0";

    public static final String MODIFIED_BY = "Test Test2";
    public static final String MODIFIED_DATE = "2019-04-01";
    public static final String CREATED_DATE = "2019-03-30";
    public static final String CREATED_DATE_TIMESTAMP = "2019-03-30T22:14:00Z";
    public static final String MODIFIED_DATE_TIMESTAMP = "2019-04-01T22:00:00Z";
    public static final String IMAGE_URL = "/documents/20142/0/breakfast-1663295.jpg/0826ea0a-e471-b18c-6596-7ae3d8c32d3b?t=1553903510397";
    public static final int MAX_ATTENDEES = 24;
    public static final boolean REGISTERABLE = true;
    public static final boolean RECURRING = true;
    public static final int INTERVAL = 1;
    public static final int RECURRENCE_END_YEAR = 2019;
    public static final int RECURRENCE_END_MONTH = 6;
    public static final int RECURRENCE_END_DAY = 15;
    public static final String RECURRENCE_END_TIMESTAMP = "2019-06-15T00:00:00.000Z";
    public static final String PUBLICATION_DATE_TIMESTAMP = "2019-06-14T15:00:00.000Z";
    public static final int PUBLICATION_YEAR = 2019;
    public static final int PUBLICATION_MONTH = 6;
    public static final int PUBLICATION_DAY = 14;
    public static final int PUBLICATION_HOUR = 3;
    public static final int PUBLICATION_MINUTE = 0;
    public static final TargetAudience TARGET_AUDIENCE = new TargetAudience("1", "Adult");
    public static final int END_MINUTE = 0;
    public static final int END_HOUR = 23;

    public static final String TAGS = "p,p2,p3";

    public static final String TITLE = "Pascals event R";
    public static final String EVENT_ID = "ddd5570a-05fb-44a5-883e-49d03f25b293";
    public static final String CUSTOMER_ID = "5c41e81c85879d080306a45b";
    public static final int NR_ATTENDEES = 6;
    public static final boolean EDIT_ALL = true;
    public static final String STATUS = "DRAFT";
    public static final String DESCRIPTION = "gfds";
    public static final String START_DATE_TIMESTAMP = "2019-04-20T21:00:00.000Z";
    public static final String END_DATE_TIMESTAMP = "2019-04-30T23:00:00.000Z";
    public static final int START_YEAR = 2019;
    public static final int START_MONTH = 4;
    public static final int START_DAY = 20;
    public static final int START_HOUR = 9;
    public static final int START_MINUTE = 0;
    public static final String CREATED_BY = "Test Test";
    public static final Location LOCATION = new Location("1", "Lund");
    public static final Location ROOM = new Location("2", "Small room");
    public static final String PUBLICATION_DATE_TIMESTAMP2 = "2019-03-20T10:00:00.000Z";
    public static final String PUBLICATION_DATE2 = "2019-03-20";
    public static final int PUBLICATION_HOUR2 = 10;


    public static RecurringDTO convertRecurring(String frequency, int interval, Instant repeatUntil, String[] byDay) {
        RecurringDTO recurring = new RecurringDTO();
        recurring.setFrequency(frequency);
        recurring.setInterval(interval);
        recurring.setRepeatUntil(repeatUntil);
        recurring.setByDay(byDay);
        return recurring;
    }

    public static Image convertImage(String imageUrl, String imageCaption) {
        Image image = new Image();
        image.setImageId(String.valueOf(imageUrl.hashCode()));
        image.setImageUrl(imageUrl);
        image.setImageCaption(imageCaption);
        return image;
    }

    public static LocalDate convertDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }


}
