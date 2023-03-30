import { createPubSub } from './helpers/index.js'

export class OrganisationUnitNode {
    constructor({
        id,
        displayName,
        level,
        path,
        childrenCount,
        children = new Map(),
        parent = null,
        manager,
    } = {}) {
        this.subscribers = {
            label: createPubSub(this.getLabelState.bind(this)),
            children: createPubSub(this.getChildrenState.bind(this)),
        }
        this.manager = manager
        this._state = {
            id: id,
            displayName: displayName,
            level: level,
            path: path,
            childrenCount: childrenCount,
            children: children,
            parent: parent,
            error: null,
        }

        this.toggleHiddenChildren = this.toggleHiddenChildren.bind(this)
        this.toggleOpen = this.toggleOpen.bind(this)
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    toJSON() {
        /* Only include fields which were fetched from the server
         * Don't include `parent` or `children` because we cannot
         * guarrantee these are all available */
        return {
            id: this.getId(),
            displayName: this.getDisplayName(),
            level: this.getLevel(),
            path: this.getPath(),
            childrenCount: this.getChildrenCount(),
        }
    }

    getId() {
        return this._state.id
    }

    getDisplayName() {
        return this._state.displayName
    }

    getLevel() {
        return this._state.level
    }

    getPath() {
        return this._state.path
    }

    getChildrenCount() {
        return this._state.childrenCount
    }

    getError() {
        return this._state.error
    }

    setError(error) {
        this._state.error = error
    }

    isRootNode() {
        return this.manager.isNodeRoot(this.getId())
    }

    hasAllChildren() {
        return this._state.children.size === this._state.childrenCount
    }

    addChild(node) {
        this._state.children.set(node.getId(), node)
    }

    addChildren(nodes) {
        for (const node of nodes) {
            this.addChild(node)
        }
    }

    setParent(node) {
        this._state.parent = node
    }

    forEachChild(callback) {
        for (const child of this._state.children.values()) {
            callback(child)
        }
    }

    findChild(callback) {
        for (const child of this._state.children.values()) {
            if (callback(child)) {
                return child
            }
        }
    }

    forEachDescendant(callback, node = this) {
        node.forEachChild((child) => {
            callback(child)
            child.forEachDescendant(callback, child)
        })
    }

    forEachAncestor(callback) {
        let parent = this.getParent()
        while (parent) {
            callback(parent)
            parent = parent.getParent()
        }
    }

    forEachSibling(callback) {
        this.getParent()?.forEachChild((child) => {
            if (child !== this) {
                callback(child)
            }
        })
    }

    getChildren() {
        const children = []
        this.forEachChild((child) => {
            children.push(child)
        })
        return children
    }

    getParent() {
        return this._state.parent
    }

    getDescendants() {
        /* This forEachDescendant recursively traverses children,
         * and thus returns an array which is not sorted by level.
         * But for the consumers of this method it is more convenient
         * to have the array organised by level. First producing the
         * unsorted array and then calling `sort` on it would make
         * this function O(n*2) but the logic below keeps it
         * roughly around O(n) */
        let descendants = []
        const descendantLevels = new Map()
        this.forEachDescendant((descendant) => {
            const descendantLevel = descendant.getLevel()
            if (!descendantLevels.get(descendantLevel)) {
                descendantLevels.set(descendantLevel, [])
            }
            descendantLevels.get(descendantLevel).push(descendant)
        })
        descendantLevels.forEach((descendantsAtLevel) => {
            descendants = descendants.concat(descendantsAtLevel)
        })
        return descendants
    }

    getAncestors() {
        const ancestors = []
        this.forEachAncestor((ancestor) => {
            ancestors.push(ancestor)
        })
        return ancestors
    }

    getSiblings() {
        const siblings = []
        this.forEachSibling((sibling) => {
            siblings.push(sibling)
        })
        return siblings
    }

    getLabelState() {
        const isLeafNode = this.isLeafNode()
        const isDisabled = this.isDisabled()
        const isLoading = this.isLoading()

        return {
            displayName: this.getDisplayName(),
            filteredString: this.manager.getFilteredString(),
            hasSelectedDescendant: this.hasSelectedDescendant(),
            isDisabled,
            isFilterMatch: this.isFilterMatch(),
            isLeafNode,
            isLoading,
            isOpen: this.isOpen(),
            isSelected: this.isSelected(),
            singleSelection: this.manager.getSingleSelection(),
            toggleOpen: isLoading || isLeafNode ? undefined : this.toggleOpen,
            toggleSelected: isDisabled ? undefined : this.toggleSelected,
        }
    }

    getChildrenState() {
        const visibleChildrenIds = []
        let hasChildWithFilterMatch = false

        this.forEachChild((child) => {
            if (child.isVisible()) {
                visibleChildrenIds.push(child.getId())
            }
            if (child.isFilterMatch()) {
                hasChildWithFilterMatch = true
            }
        })

        const hiddenSiblingsCount =
            this.getChildrenCount() - visibleChildrenIds.length
        const isShowingHiddenSiblings = this.manager.isParentWithAllChildrenLoaded(
            this.getId()
        )
        const shouldShowAllSiblingsToggler =
            this.isOpen() &&
            !this.isLeafNode() &&
            this.manager.isInFilterMode() &&
            hasChildWithFilterMatch &&
            (hiddenSiblingsCount > 0 || isShowingHiddenSiblings)

        return {
            visibleChildrenIds,
            error: this._state.error,
            shouldShowAllSiblingsToggler,
            levelDisplayName: this.manager.getOrganisationUnitLevelDisplayName(
                this.getLevel() + 1
            ),
            hiddenSiblingsCount,
            toggleAllSiblings: shouldShowAllSiblingsToggler
                ? this.toggleHiddenChildren
                : undefined,
        }
    }

    isDisabled() {
        return this.manager.isNodeDisabled(this.getId())
    }

    hasSelectedDescendant() {
        return this.manager.hasNodeSelectedDescendant(this.getId())
    }

    isFilterMatch() {
        return this.manager.isNodeFilterMatch(this.getId())
    }

    isLeafNode() {
        return this._state.childrenCount === 0
    }

    isLoading() {
        return this.manager.isNodeFetchingChildren(this.getId())
    }

    isOpen() {
        return this.manager.isNodeShowingChildren(this.getId())
    }

    isSelected() {
        return this.manager.isNodeSelected(this.getId())
    }

    isVisible() {
        const id = this.getId()
        const parentId = this.getParent()?.getId()

        if (this.manager.isInFilterMode()) {
            return (
                this.manager.isNodeFilterMatch(id) ||
                this.manager.isNodeShowingChildren(id) ||
                (parentId &&
                    this.manager.isParentWithAllChildrenLoaded(parentId))
            )
        } else {
            const isOpenRootNode =
                this.isRootNode() && this.manager.isNodeInOpenedIds(id)
            const isOpenSubTreeNode =
                parentId && this.manager.isNodeInOpenedIds(parentId)

            return isOpenRootNode || isOpenSubTreeNode
        }
    }

    toggleHiddenChildren() {
        if (!this.isLoading()) {
            this.manager.toggleHiddenChildren(this.getId())
        }
    }

    toggleOpen() {
        this.manager.toggleNodeOpened(this.getId())
    }

    toggleSelected() {
        this.manager.toggleNodeSelection(this.getId())
    }

    refreshLabel() {
        this.subscribers.label.notify()
    }

    refreshChildren() {
        this.subscribers.children.notify()
    }
}
