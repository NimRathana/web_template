'use client'

import classnames from 'classnames'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import StyledHeader from '@layouts/styles/vertical/StyledHeader'
import { useSettings } from '@core/hooks/useSettings'

const Navbar = props => {
  const { children, overrideStyles } = props
  const { settings } = useSettings()
  const isContentCompact = settings.contentWidth === 'compact'

  return (
    <StyledHeader
      overrideStyles={overrideStyles}
      isContentCompact={isContentCompact}
      className={classnames(
        verticalLayoutClasses.header,
        verticalLayoutClasses.headerContentCompact,
        verticalLayoutClasses.headerStatic,
        verticalLayoutClasses.headerDetached
      )}
    >
      <div className={classnames(verticalLayoutClasses.navbar, 'flex bs-full')}>{children}</div>
    </StyledHeader>
  )
}

export default Navbar
