import React from 'react'
import propTypes from '@dhis2/prop-types'

const IconImportItems24 = ({ className, color }) => (
    <svg
        className={className}
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m18 13c1.1045695 0 2 .8954305 2 2v3c0 1.1045695-.8954305 2-2 2h-3c-1.1045695 0-2-.8954305-2-2v-3c0-1.1045695.8954305-2 2-2zm-9 0c1.1045695 0 2 .8954305 2 2v3c0 1.1045695-.8954305 2-2 2h-3c-1.1045695 0-2-.8954305-2-2v-3c0-1.1045695.8954305-2 2-2zm9 2h-3v3h3zm-9 0h-3v3h3zm-1.38710056-12.29029539.09420734.08318861 3.50000002 3.5c.3604839.36048396.3882135.92771502.0831886 1.32000622l-.0831886.09420734-3.50000002 3.50000002c-.39052429.3905243-1.02368927.3905243-1.41421356 0-.36048396-.360484-.3882135-.927715-.08318861-1.32000624l.08318861-.09420734 1.79210678-1.79289322h-5.085c-.55228475 0-1-.44771525-1-1 0-.51283584.38604019-.93550716.88337887-.99327227l.11662113-.00672773h5.085l-1.79210678-1.79289322c-.36048396-.36048396-.3882135-.92771502-.08318861-1.32000622l.08318861-.09420734c.36048396-.36048396.92771502-.3882135 1.32000622-.08318861zm10.38710056 1.29029539c1.1045695 0 2 .8954305 2 2v3c0 1.1045695-.8954305 2-2 2h-3c-1.1045695 0-2-.8954305-2-2v-3c0-1.1045695.8954305-2 2-2zm0 2h-3v3h3z"
            fill="inherit"
        />
        <style jsx>{`
            svg {
                fill: ${color};
                pointer-events: none;
            }
        `}</style>
    </svg>
)

IconImportItems24.propTypes = {
    color: propTypes.string.isRequired,
    className: propTypes.string,
}

const IconImportItems = ({ className, color, size }) => {
    switch (size) {
        case 24:
            return <IconImportItems24 className={className} color={color} />

        default:
            return null
    }
}

IconImportItems.defaultProps = {
    size: 24,
    color: 'inherit',
}

IconImportItems.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
    size: propTypes.oneOf([24]),
}

export { IconImportItems }
