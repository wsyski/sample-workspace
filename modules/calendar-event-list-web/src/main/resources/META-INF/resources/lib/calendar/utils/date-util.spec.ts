import DateUtil from './date-util';
import {PortalUtil} from '../../core/utils/portal-util';

describe('DateUtil', () => {
  beforeEach(() => {
    spyOn(PortalUtil, 'getLocaleId').and.returnValue('en-US');
  });

  describe('formatDateInterval', () => {
    let startDateTimeAsObject: Date;
    let endDateTimeAsObject: Date;

    describe('date and time the same day', () => {
      beforeEach(() => {
        startDateTimeAsObject = new Date(2018, 0, 1, 12, 0, 0);
        endDateTimeAsObject = new Date(2018, 0, 1, 18, 0, 0);
      });

      it('expected date, start, and end', () => {
        expect(DateUtil.formattedDateInterval(startDateTimeAsObject, endDateTimeAsObject)).toEqual(
          {
            date: 'Mon, Jan 1',
            start: '12:00 PM',
            startDate: 'Mon, Jan 1',
            end: '06:00 PM',
            endDate: 'Mon, Jan 1',
            startDateFull: 'Monday, January 1',
            endDateFull: 'Monday, January 1'
          }
        );
      });
    });

    describe('date and time multi days', () => {
      beforeEach(() => {
        startDateTimeAsObject = new Date(2018, 0, 1, 12, 0, 0);
        endDateTimeAsObject = new Date(2018, 0, 2, 18, 0, 0);
      });

      it('expected start, and end', () => {
        expect(DateUtil.formattedDateInterval(startDateTimeAsObject, endDateTimeAsObject)).toEqual(
          {
            start: '12:00 PM',
            startDate: 'Mon, Jan 1',
            end: '06:00 PM',
            endDate: 'Tue, Jan 2',
            startDateFull: 'Monday, January 1',
            endDateFull: 'Tuesday, January 2'
          }
        );
      });
    });
  });
});
