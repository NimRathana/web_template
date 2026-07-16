// Third-party Imports
import styled from '@emotion/styled'

// Util Imports
import { menuClasses } from '../../utils/menuClasses'

const StyledHorizontalMenu = styled.nav`
  display: block;
  & > ul {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &.${menuClasses.root} {
    ${({ rootStyles }) => rootStyles}
  }
`

export default StyledHorizontalMenu
