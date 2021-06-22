import propTypes from '@dhis2/prop-types'
import { colors } from '@dhis2/ui-constants'
import cx from 'classnames'
import React from 'react'

const Tabs = ({ children, fixed, dataTest }) => (
    <div className={cx({ fixed })} data-test={dataTest}>
        {children}

        <style jsx>{`
            div {
                display: flex;
                align-items: flex-start;
                position: relative;
                overflow: hidden;
                box-shadow: inset 0 -1px 0 0 ${colors.grey400};
                flex-wrap: nowrap;
                flex-grow: 1;
                background: ${colors.white};
            }
        `}</style>
    </div>
)

Tabs.propTypes = {
    dataTest: propTypes.string.isRequired,
    children: propTypes.node,
    fixed: propTypes.bool,
}

export { Tabs }
