import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResizeHandle from './ResizeHandle'

export class ResizeHandlesContainer extends React.Component {
  static propTypes = {
    // Provided by parent
    width: PropTypes.number,
    position: PropTypes.number,

    // Provided by store
    isDragging: PropTypes.bool,
    activeSegment: PropTypes.number,
    infoBubbleHovered: PropTypes.bool,
    descriptionVisible: PropTypes.bool
  }

  static defaultProps = {
    isDragging: false
  }

  constructor (props) {
    super(props)

    this.leftDragHandle = React.createRef()
    this.rightDragHandle = React.createRef()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    /**
     * temporarily removed because refs are breaking connectDragSource
     */
    // if (Number.isInteger(this.props.activeSegment) && Number.isInteger(prevProps.activeSegment)) {
    //   this.leftDragHandle.current.classList.add('drag-handle-show-immediate')
    //   this.rightDragHandle.current.classList.add('drag-handle-show-immediate')
    //   window.setTimeout(() => {
    //     // Check if ref still exists in case it is cleaned up by React
    //     if (this.leftDragHandle.current) {
    //       this.leftDragHandle.current.classList.remove('drag-handle-show-immediate')
    //     }
    //     if (this.rightDragHandle.current) {
    //       this.rightDragHandle.current.classList.remove('drag-handle-show-immediate')
    //     }
    //   }, 0)
    // }
  }

  render () {
    const show = (this.props.activeSegment === this.props.position)
    const suppress = (this.props.infoBubbleHovered || this.props.descriptionVisible || this.props.isDragging)

    return (
      <React.Fragment>
        <ResizeHandle side="left" show={show} suppress={suppress} width={this.props.width} />
        <ResizeHandle side="right" show={show} suppress={suppress} width={this.props.width} />
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    isDragging: state.ui.resizeDragState,
    activeSegment: (typeof state.ui.activeSegment === 'number') ? state.ui.activeSegment : null,
    infoBubbleHovered: state.infoBubble.mouseInside,
    descriptionVisible: state.infoBubble.descriptionVisible
  }
}

export default connect(mapStateToProps)(ResizeHandlesContainer)