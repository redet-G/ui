import { useState, useEffect } from 'react'
import { useOrganisationUnitNode } from './use-organisation-unit-node.js'

export const useOrganisationUnitNodeLabel = (id) => {
    const node = useOrganisationUnitNode(id)
    const [state, setState] = useState(node.getLabelState())

    useEffect(
        () =>
            node.subscribers.label.subscribe((state) => {
                setState(state)
            }),
        [node]
    )

    return state
}