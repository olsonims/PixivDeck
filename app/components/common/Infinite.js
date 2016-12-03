// @flow
import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import styles from './Infinite.css'

type Props = {
	rootMargin?: string,
	onIntersect: () => void,
	children?: any,
	style?: Object
};

export default class Infinite extends Component {
	props: Props;
	sentinel: Component<*, *, *>;
	root: Component<*, *, *>;
	io: Object;

	componentDidMount() {
		const sentinel = this.sentinel
		this.io = new IntersectionObserver(entries => { // eslint-disable-line no-undef
			if (entries[0].intersectionRatio <= 0) {
				return
			}
			requestAnimationFrame(() => {
				this.handleOnIntersect()
			})
		}, {
			root: this.root,
			rootMargin: this.props.rootMargin || '1000px',
		})
		this.io.observe(findDOMNode(sentinel))
	}

	handleOnIntersect() {
		this.props.onIntersect()
	}

	handleRefs = (c: Component<*, *, *>) => {
		this.sentinel = c
	}

	handleRootRefs = (c: Component<*, *, *>) => {
		this.root = c
		console.log(this.root)
	}

	render() {
		return (
			<div
				ref={this.handleRootRefs}
				style={this.props.style}
				className={styles.base}
				>
				{this.props.children}
				<div ref={this.handleRefs} style={{height: 100}}/>
			</div>
		)
	}
}
