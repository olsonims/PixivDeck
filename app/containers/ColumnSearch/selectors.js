// @flow
import { createSelector } from 'reselect'
import type { State } from 'types/state'
import type { ColumnId } from './reducer'

type Props = {
  id: ColumnId,
}

const getColumns = (state: State) => state.ColumnSearch

export const makeSelectIds = () =>
  createSelector(getColumns, s => Object.keys(s))

const getColumn = (state: State, { id }: Props) => state.ColumnSearch[id]

export const makeSelectColumn = () => createSelector(getColumn, s => s)

export const makeSelectMinBookmark = () =>
  createSelector(makeSelectColumn(), s => s.minBookmarks)

export const makeSelectNextUrl = () =>
  createSelector(makeSelectColumn(), s => s.nextUrl)

const makeSelectIllustIds = () =>
  createSelector(getColumn, s => (s && s.illustIds ? s.illustIds : []))

const selectIllustById = (state: State) => state.illustById

export const makeSelectIllusts = () =>
  createSelector(makeSelectIllustIds(), selectIllustById, (s, arr) => {
    return s.map(v => arr[v])
  })

export const makeLimitedSelectIllusts = () =>
  createSelector(makeSelectIllusts(), makeSelectMinBookmark(), (s, limit) =>
    s.filter(s => s.totalBookmarks > limit)
  )

export const makeIllustLength = () =>
  createSelector(makeLimitedSelectIllusts(), s => s.length)