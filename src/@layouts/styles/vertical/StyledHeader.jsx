// Third-party Imports
import styled from '@emotion/styled'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  flex-shrink: 0;
  min-block-size: var(--header-height);

  .${verticalLayoutClasses.navbar} {
    position: relative;
    padding-block: 10px;
    padding-inline:  ${({ scrolled }) => scrolled ? `${themeConfig.layoutPadding}px` : '0'};
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: ${({ isContentCompact }) => isContentCompact ? `${themeConfig.compactContentWidth}px` : '100%'};
    transition: all 0.3s ease;
    background-color: ${({ scrolled }) => scrolled ? 'rgb(var(--mui-palette-background-paperChannel) / 0.8)' : 'transparent'};
    backdrop-filter: ${({ scrolled, isBlur }) => scrolled && isBlur ? 'blur(20px)' : 'none'};
    border: ${({ skin, scrolled }) => scrolled && skin === 'bordered' ? '1px solid var(--mui-palette-divider)' : 'none'};
    box-shadow: ${({ skin, scrolled }) => scrolled && skin !== 'bordered' ? 'var(--mui-customShadows-md)' : 'none'};
    border-radius: ${({ theme, isFloating }) => isFloating ? `${theme.shape.customBorderRadius.md}px` : `${theme.shape.customBorderRadius.sm}px`};
  }

  ${({ overrideStyles }) => overrideStyles}
`

export default StyledHeader
