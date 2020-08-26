import React, { Children, cloneElement } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

import { SMALL, XLARGE } from "../styles/spacing";
import * as Breakpoints from "../styles/breakpoints";

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: ${props => (props.nested ? 0 : 3 * XLARGE)}px;
  padding-right: ${props => (props.nested ? 0 : 3 * XLARGE)}px;
  width: 100%;

  @media screen and (max-width: ${Breakpoints.XL}px) {
    padding-left: ${props => (props.nested ? 0 : 1.5 * XLARGE)}px;
    padding-right: ${props => (props.nested ? 0 : 1.5 * XLARGE)}px;
  }

  @media screen and (max-width: ${Breakpoints.L}px) {
    padding-left: ${props => (props.nested ? 0 : XLARGE)}px;
    padding-right: ${props => (props.nested ? 0 : XLARGE)}px;
  }
`;

const use = (obj, key, fallback) => {
  return obj[key] !== undefined ? obj[key] : fallback;
};

/**
 * Direct children of a Grid should *only* be Columns.
 * Without any configuration, will automatically set left and right padding to take
 * up (nearly) the entire screen. If the `nested` boolean prop is set, then
 * there won't be any left or right padding (for nested Grids).
 */
const Grid = ({ children, nested = false, ...props }) => {
  let XLcols = 0;
  let Lcols = 0;
  let Mcols = 0;
  let Scols = 0;
  let XScols = 0;

  return (
    <StyledGrid nested={nested}>
      {Children.toArray(children).map(child => {
        const useProps = (key, fallback) => use(child.props, key, fallback);

        const XLwidth = useProps("width", 12);
        const Lwidth = useProps("largeWidth", XLwidth);
        const Mwidth = useProps("medWidth", Lwidth);
        const Swidth = useProps("smallWidth", Mwidth);
        const XSwidth = useProps("xSmallWidth", Swidth);

        XLcols += XLwidth;
        Lcols += Lwidth;
        Mcols += Mwidth;
        Scols += Swidth;
        XScols += XSwidth;

        const addlProps = {};

        if (XLcols === 12) {
          addlProps.XLlast = true;
          XLcols = 0;
        }

        if (Lcols === 12) {
          addlProps.Llast = true;
          Lcols = 0;
        }

        if (Mcols === 12) {
          addlProps.Mlast = true;
          Mcols = 0;
        }

        if (Scols === 12) {
          addlProps.Slast = true;
          Scols = 0;
        }

        if (XScols === 12) {
          addlProps.XSlast = true;
          XScols = 0;
        }

        if (!isEmpty(addlProps)) {
          child = cloneElement(
            child,
            Object.assign({}, child.props, addlProps)
          );
        }

        return child;
      })}
    </StyledGrid>
  );
};

export default Grid;
