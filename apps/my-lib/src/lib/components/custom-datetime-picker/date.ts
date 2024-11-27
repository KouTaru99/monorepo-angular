export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

export enum DateTimePickerType {
  DATE_RANGE = 'date-range',
  DATE_SINGLE = 'date-single',
  DATE_TIME_RANGE = 'date-time-range',
  DATE_TIME_SINGLE = 'date-time-single'
}

export const DATE_TIME_PICKER_TYPE_FORMATS = {
  [DateTimePickerType.DATE_RANGE]: 'd0/M0/9999 - d0/M0/9999',
  [DateTimePickerType.DATE_SINGLE]: 'd0/M0/9999',
  [DateTimePickerType.DATE_TIME_RANGE]: 'Hh:m0:s0 d0/M0/9999 - Hh:m0:s0 d0/M0/9999',
  [DateTimePickerType.DATE_TIME_SINGLE]: 'Hh:m0:s0 d0/M0/9999'
}
