// Third-party Imports
import styled from '@emotion/styled'

const StyledHorizontalSubMenuContent = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 12rem;
  background: var(--menu-bg, #fff);
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
  padding: 0.5rem 0;
  z-index: 9999;
  display: ${({ open }) => (open ? 'block' : 'none')};

  ul.horizontal-submenu-ul {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;
  }

  ul.horizontal-submenu-ul > li {
    padding: 0;
  }

  ${({ rootStyles }) => rootStyles}
`
