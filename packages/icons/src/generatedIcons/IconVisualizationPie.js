import React from 'react'
import propTypes from '@dhis2/prop-types'

const IconVisualizationPie16 = ({ className, color }) => (
    <svg
        className={className}
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m7.58588768 8.99988768 5.31964212 5.32005842c-1.3546652 1.0530075-3.05687025 1.6800539-4.9055298 1.6800539-4.07961282 0-7.44600019-3.0536812-7.9381045-6.99998598zm1.41412634-8.93799218c3.94630478.49210431 6.99998598 3.85849168 6.99998598 7.9381045 0 1.84865955-.6270464 3.5508646-1.6800539 4.9055298l-5.3199461-5.3205298zm-1.9999653-.00000782-.00016104 6.938-6.938.00016104c.45123002-3.61875655 3.31940449-6.48693102 6.93816104-6.93816104z"
            fill="inherit"
            fillRule="evenodd"
        />
        <style jsx>{`
            svg {
                fill: ${color};
                pointer-events: none;
            }
        `}</style>
    </svg>
)

IconVisualizationPie16.propTypes = {
    color: propTypes.string.isRequired,
    className: propTypes.string,
}

const IconVisualizationPie = ({ className, color, size }) => {
    switch (size) {
        case 16:
            return (
                <IconVisualizationPie16 className={className} color={color} />
            )

        default:
            return null
    }
}

IconVisualizationPie.defaultProps = {
    size: 16,
    color: 'inherit',
}

IconVisualizationPie.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
    size: propTypes.oneOf([16]),
}

export { IconVisualizationPie }
