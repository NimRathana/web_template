"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { menuClasses } from "../utils/menuClasses";

const StyledSubMenuContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  border-radius: 5px;
  background: var(--mui-palette-background-paper);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.35);

  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);

  transition:
    opacity ${({ transitionDuration }) => transitionDuration}ms ease,
    transform ${({ transitionDuration }) => transitionDuration}ms ease;

  &.${menuClasses.open} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  /* nested menu */
  ${({ isNested, isOverflowRight }) =>
    isNested &&
    `
      top: 0;
      margin-top: 0;

      ${
        isOverflowRight
          ? `
            right: calc(100% + 8px);
            left: auto;
          `
          : `
            left: calc(100% + 8px);
            right: auto;
          `
      }
    `}

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const SubMenuContent = (props, ref) => {
  const {
    children,
    open,
    level = 0,
    transitionDuration = 200,
    ...rest
  } = props;

  const contentRef = useRef(null);

  const [isOverflowRight, setIsOverflowRight] = useState(false);

  useImperativeHandle(ref, () => contentRef.current);

  useEffect(() => {
    if (!open || !contentRef.current) {
      setIsOverflowRight(false);
      return;
    }

    const checkPosition = () => {
      const rect = contentRef.current.getBoundingClientRect();

      const overflowRight = rect.right > window.innerWidth - 8;

      const overflowLeft = rect.left < 8;

      if (overflowRight) {
        setIsOverflowRight(true);
      } else if (overflowLeft) {
        setIsOverflowRight(false);
      }
    };

    // wait until submenu is visible
    requestAnimationFrame(checkPosition);

    window.addEventListener("resize", checkPosition);

    return () => {
      window.removeEventListener("resize", checkPosition);
    };
  }, [open]);

  return (
    <StyledSubMenuContent
      ref={contentRef}
      className={open ? menuClasses.open : ""}
      transitionDuration={transitionDuration}
      isNested={level > 0}
      isOverflowRight={isOverflowRight}
      {...rest}
    >
      <ul>{children}</ul>
    </StyledSubMenuContent>
  );
};

export default forwardRef(SubMenuContent);
