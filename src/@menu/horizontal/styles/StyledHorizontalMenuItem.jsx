// Third-party Imports
import styled from '@emotion/styled'

const StyledHorizontalMenuItem = styled.li`
  display: inline-block;
  position: relative;

  > a, > .menu-button {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
  }

  &.ts-menu-item-root:hover > a {
    background: rgba(15, 23, 42, 0.04);
  }

  ${({ menuItemStyles }) => menuItemStyles}
  ${({ rootStyles }) => rootStyles}
`

export default StyledHorizontalMenuItem
