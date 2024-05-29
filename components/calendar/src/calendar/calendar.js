import { useResolvedDirection } from '@dhis2/multi-calendar-dates'
import { colors } from '@dhis2/ui-constants'
import PropTypes from 'prop-types'
import React from 'react'
import { CalendarTable } from './calendar-table.js'
import { NavigationContainer } from './navigation-container.js'

export const Calendar = (calendarProps) => {
    const {
        date,
        dir,
        locale,
        width,
        cellSize,
        calendarWeekDays,
        weekDayLabels,
        isValid,
    } = calendarProps

    const wrapperBorderColor = colors.grey300
    const backgroundColor = 'none'

    const languageDirection = useResolvedDirection(dir, locale)

    return (
        <div>
            <div
                className="calendar-wrapper"
                dir={languageDirection}
                data-test="calendar"
            >
                <NavigationContainer
                    pickerOptions={calendarProps}
                    languageDirection={languageDirection}
                />
                <CalendarTable
                    selectedDate={isValid ? date : null}
                    calendarWeekDays={calendarWeekDays}
                    weekDayLabels={weekDayLabels}
                    cellSize={cellSize}
                    width={width}
                />
            </div>
            <style jsx>{`
                .calendar-wrapper {
                    font-family: Roboto, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    background-color: ${backgroundColor};
                    display: flex;
                    flex-direction: column;
                    border: 1px solid ${wrapperBorderColor};
                    border-radius: 3px;
                    min-width: ${width};
                    width: max-content;
                    box-shadow: 0px 4px 6px -2px #2129340d;
                    box-shadow: 0px 10px 15px -3px #2129341a;
                }
            `}</style>
        </div>
    )
}

Calendar.defaultProps = {
    cellSize: '32px',
    width: '240px',
    weekDayFormat: 'narrow',
}

export const CalendarProps = {
    /** the size of a single cell in the table forming the calendar */
    cellSize: PropTypes.string,
    /** the currently selected date using an iso-like format YYYY-MM-DD, in the calendar system provided (not iso8601) */
    date: PropTypes.string,
    /** the direction of the library - internally the library will use rtl for rtl-languages but this can be overridden here for more control */
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    /** any valid locale -  if none provided, the internal library will fallback to the user locale (more info here: https://github.com/dhis2/multi-calendar-dates/blob/main/src/hooks/internal/useResolvedLocaleOptions.ts#L15) */
    locale: PropTypes.string,
    /** the format to display for the week day, i.e. Monday (long), Mon (short), M (narrow) */
    weekDayFormat: PropTypes.oneOf(['narrow', 'short', 'long']),
    /** the width of the calendar component */
    width: PropTypes.string,
    /** is date valid and within range */
    isValid: PropTypes.bool,
}

Calendar.propTypes = CalendarProps
