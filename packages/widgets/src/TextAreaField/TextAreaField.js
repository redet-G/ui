import { sharedPropTypes } from '@dhis2/ui-constants'
import { Field, TextArea, Box } from '@dhis2/ui-core'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * @module
 * @param {TextAreaField.PropTypes} props
 * @returns {React.Component}
 *
 * @example import { TextAreaField } from '@dhis2/ui-widgets'
 *
 * @see Specification: {@link https://github.com/dhis2/design-system/blob/update-input/atoms/inputfield.md#textarea|Design system}
 * @see Live demo: {@link /demo/?path=/story/textareafield--default|Storybook}
 */
const TextAreaField = ({
    className,
    onChange,
    onFocus,
    onBlur,
    initialFocus,
    dense,
    required,
    label,
    disabled,
    placeholder,
    name,
    valid,
    error,
    warning,
    loading,
    value,
    tabIndex,
    helpText,
    validationText,
    autoGrow,
    readOnly,
    resize,
    rows,
    inputWidth,
    dataTest,
}) => (
    <Field
        className={className}
        dataTest={dataTest}
        disabled={disabled}
        required={required}
        name={name}
        helpText={helpText}
        validationText={validationText}
        error={error}
        warning={warning}
        valid={valid}
        label={label}
    >
        <Box width={inputWidth} minWidth="220px">
            <TextArea
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
                name={name}
                value={value || ''}
                placeholder={placeholder}
                disabled={disabled}
                valid={valid}
                warning={warning}
                error={error}
                loading={loading}
                dense={dense}
                tabIndex={tabIndex}
                initialFocus={initialFocus}
                autoGrow={autoGrow}
                readOnly={readOnly}
                resize={resize}
                rows={rows}
            />
        </Box>
    </Field>
)

TextAreaField.defaultProps = {
    rows: 4,
    width: '100%',
    resize: 'vertical',
    dataTest: 'dhis2-uiwidgets-textareafield',
}

/**
 * @typedef {Object} PropTypes
 * @static
 *
 * @prop {string} name
 * @prop {function} [onChange]
 * @prop {function} [onBlur]
 * @prop {function} [onFocus]
 * @prop {string} [label]
 * @prop {string} [className]
 * @prop {string} [placeholder]
 * @prop {string} [value]
 * @prop {string} [tabIndex]
 *
 * @prop {boolean} [required]
 * @prop {boolean} [disabled]
 * @prop {boolean} [dense] - Compact mode
 * @prop {boolean} [initialFocus]
 *
 * @prop {boolean} [valid] - `valid`, `warning`, `error`, and `loading`
 * are mutually exclusive
 * @prop {boolean} [warning]
 * @prop {boolean} [error]
 * @prop {boolean} [loading]
 *
 * @prop {string} [validationText]
 * @prop {string} [helpText]
 *
 * @prop {boolean} [autoGrow]
 * @prop {boolean} [readOnly]
 * @prop {string} [resize=vertical] - resize attribute on the textarea,
 * one of `none`, `both`, `horizontal`, `vertical`
 * @prop {number} [rows=4]
 * @prop {string} [inputWidth]
 * @prop {string} [dataTest]
 */
TextAreaField.propTypes = {
    /** Grow the text area in response to overflow instead of adding a scroll bar */
    autoGrow: PropTypes.bool,
    className: PropTypes.string,
    dataTest: PropTypes.string,
    /** Compact mode */
    dense: PropTypes.bool,
    /** Disables the textarea and makes in non-interactive */
    disabled: PropTypes.bool,
    /** Applies 'error' styles for validation feedback. Mutually exclusive with `valid` and `warning` props */
    error: sharedPropTypes.statusPropType,
    /** Adds useful help text below the textarea */
    helpText: PropTypes.string,
    /** Grabs initial focus on the page */
    initialFocus: PropTypes.bool,
    /** Sets the width of the textarea. Minimum 220px. Any valid CSS measurement can be used */
    inputWidth: PropTypes.string,
    /** Labels the textarea */
    label: PropTypes.string,
    /** Adds a loading spinner */
    loading: PropTypes.bool,
    /** Name associated with the text area. Passed in object argument to event handlers. */
    name: PropTypes.string,
    /** Placeholder text for an empty textarea */
    placeholder: PropTypes.string,
    /** Makes the textarea read-only */
    readOnly: PropTypes.bool,
    /** Adds an asterisk to the label to indicate this field is required */
    required: PropTypes.bool,
    /** [Resize property](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) for the textarea element */
    resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
    /** Initial height of the textarea, in lines of text */
    rows: PropTypes.number,
    tabIndex: PropTypes.string,
    /** Applies 'valid' styles for validation feedback. Mutually exclusive with `warning` and `error` props */
    valid: sharedPropTypes.statusPropType,
    /** Validation text below the textarea to provide validation feedback. Changes appearance depending on validation status */
    validationText: PropTypes.string,
    /** Value in the textarea. Can be used to control component (recommended). Passed in object argument to event handlers. */
    value: PropTypes.string,
    /** Applies 'warning' styles for validation feedback. Mutually exclusive with `valid` and `error` props */
    warning: sharedPropTypes.statusPropType,
    /** Called with signature ({ name: string, value: string }, event) */
    onBlur: PropTypes.func,
    /** Called with signature ({ name: string, value: string }, event) */
    onChange: PropTypes.func,
    /** Called with signature ({ name: string, value: string }, event) */
    onFocus: PropTypes.func,
}

export { TextAreaField }
