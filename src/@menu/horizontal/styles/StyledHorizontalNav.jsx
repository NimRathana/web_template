// Styled Horizontal Nav for Materio-like header
import styled from '@emotion/styled'

const StyledHorizontalNav = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => `${height}px`};
  background: var(--menu-bg, #ffffff);
  box-shadow: 0 1px 4px rgba(16, 24, 40, 0.06);
  z-index: 40;

  .materio-horizontal-container {
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .materio-horizontal-menu {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .materio-horizontal-menuitem {
    color: var(--menu-text, #374151);
    padding: 0.375rem 0.75rem;
    border-radius: 8px;
    text-decoration: none;
    display: inline-block;
    font-weight: 500;
    transition: background-color 120ms ease, color 120ms ease;
  }

  .materio-horizontal-menuitem:hover {
    background: rgba(15, 23, 42, 0.04);
    color: var(--menu-accent, #0ea5e9);
  }

  /* Responsive: hide the menu on smaller screens by default; user can implement a toggle button */
  @media (max-width: 768px) {
    .materio-horizontal-menu {
      display: none;
    }
  }

  /* Allow consumers to pass custom styles */
  ${({ customStyles }) => customStyles}
`

export default StyledHorizontalNav
