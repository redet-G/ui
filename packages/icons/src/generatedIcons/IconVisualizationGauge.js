import React from 'react'
import propTypes from '@dhis2/prop-types'

const IconVisualizationGauge16 = ({ className, color }) => (
    <svg
        className={className}
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="none" fillRule="nonzero">
            <path
                d="m8 4c4.418278 0 8 3.581722 8 8h-1c0-3.86599325-3.1340068-7-7-7-3.86599325 0-7 3.13400675-7 7h-1l.00380682-.2491793c.13165031-4.30298293 3.66127892-7.7508207 7.99619318-7.7508207z"
                fill="inherit"
            />
            <path
                d="m8 6v3c-1.65685425 0-3 1.3431458-3 3h-3c0-3.3137085 2.6862915-6 6-6z"
                fill="inherit"
            />
        </g>
        <style jsx>{`
            svg {
                fill: ${color};
                pointer-events: none;
            }
        `}</style>
    </svg>
)

IconVisualizationGauge16.propTypes = {
    color: propTypes.string.isRequired,
    className: propTypes.string,
}

const IconVisualizationGauge = ({ className, color, size }) => {
    switch (size) {
        case 16:
            return (
                <IconVisualizationGauge16 className={className} color={color} />
            )

        default:
            return null
    }
}

IconVisualizationGauge.defaultProps = {
    size: 16,
    color: 'inherit',
}

IconVisualizationGauge.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
    size: propTypes.oneOf([16]),
}

export { IconVisualizationGauge }
