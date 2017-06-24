// @flow
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import type { Dispatch, State } from 'types'
import {
  logout,
  toggleDropdown,
  toggleSearchField,
  closeSearchField,
} from 'actions'
import Header, { type Props } from 'components/header/Header'
import { openModal } from '../ModalManeger/actions'

const mapStateToProps = ({ manage: { isDropdown, isSearchField } }: State) => ({
  isDropdown,
  isSearchField,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout() {
    dispatch(logout())
  },
  onClickAdd() {
    dispatch(openModal('AddColumn'))
  },
  onToggleDropdown() {
    dispatch(toggleDropdown())
  },
  onOpenFilterModal() {
    dispatch(openModal('Setting'))
  },
  toggleSearchField() {
    dispatch(toggleSearchField())
  },
  closeSearchField() {
    dispatch(closeSearchField())
  },
})

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)
export default connector(Header)