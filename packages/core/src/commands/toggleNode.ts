import { NodeType } from 'prosemirror-model'
import { setBlockType } from 'prosemirror-commands'
import { Editor } from '../Editor'
import nodeIsActive from '../utils/nodeIsActive'
import getNodeType from '../utils/getNodeType'

type ToggleNodeCommand = (
  typeOrName: string | NodeType,
  toggleType: string | NodeType,
  attrs?: {}
) => Editor

declare module '../Editor' {
  interface Editor {
    toggleNode: ToggleNodeCommand,
  }
}

export default (next: Function, editor: Editor) => (typeOrName: string | NodeType, toggleTypeOrName: string | NodeType, attrs = {}) => {
  const { view, state, schema } = editor
  const type = getNodeType(typeOrName, schema)
  const toggleType = getNodeType(toggleTypeOrName, schema)
  const isActive = nodeIsActive(state, type, attrs)

  if (isActive) {
    setBlockType(toggleType)(view.state, view.dispatch)
  } else {
    setBlockType(type, attrs)(view.state, view.dispatch)
  }

  next()
}
