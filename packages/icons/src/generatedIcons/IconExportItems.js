import React from 'react'
import propTypes from '@dhis2/prop-types'

const IconExportItems24 = ({ className, color }) => (
    <svg
        className={className}
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m18.6128994 12.7097046.0942074.0831886 3.5 3.5c.3604839.360484.3882135.927715.0831886 1.3200062l-.0831886.0942074-3.5 3.5c-.3905243.3905243-1.0236893.3905243-1.4142136 0-.3604839-.360484-.3882135-.927715-.0831886-1.3200062l.0831886-.0942074 1.7921068-1.7928932h-5.085c-.5522847 0-1-.4477153-1-1 0-.5128358.3860402-.9355072.8833789-.9932723l.1166211-.0067277h5.085l-1.7921068-1.7928932c-.3604839-.360484-.3882135-.927715-.0831886-1.3200062l.0831886-.0942074c.360484-.3604839.927715-.3882135 1.3200062-.0831886zm-9.6128994.2902954c1.1045695 0 2 .8954305 2 2v3c0 1.1045695-.8954305 2-2 2h-3c-1.1045695 0-2-.8954305-2-2v-3c0-1.1045695.8954305-2 2-2zm0 2h-3v3h3zm0-11c1.1045695 0 2 .8954305 2 2v3c0 1.1045695-.8954305 2-2 2h-3c-1.1045695 0-2-.8954305-2-2v-3c0-1.1045695.8954305-2 2-2zm9 0c1.1045695 0 2 .8954305 2 2v3c0 1.1045695-.8954305 2-2 2h-3c-1.1045695 0-2-.8954305-2-2v-3c0-1.1045695.8954305-2 2-2zm-9 2h-3v3h3zm9 0h-3v3h3z"
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

IconExportItems24.propTypes = {
    color: propTypes.string.isRequired,
    className: propTypes.string,
}

const IconExportItems = ({ className, color, size }) => {
    switch (size) {
        case 24:
            return <IconExportItems24 className={className} color={color} />

        default:
            return null
    }
}

IconExportItems.defaultProps = {
    size: 24,
    color: 'inherit',
}

IconExportItems.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
    size: propTypes.oneOf([24]),
}

export { IconExportItems }
