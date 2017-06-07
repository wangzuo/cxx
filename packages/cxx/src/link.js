import React from 'react';
import PropTypes from 'prop-types';

const LEFT_MOUSE_BUTTON = 0;
const isNotLeftClick = e => e.button && e.button !== LEFT_MOUSE_BUTTON;
const hasModifier = e =>
  Boolean(e.shiftKey || e.altKey || e.metaKey || e.ctrlKey);
const shouldIgnoreClick = ({ e, target }) =>
  hasModifier(e) || isNotLeftClick(e) || e.defaultPrevented || target;

const Link = (props, context) => {
  const { href, target, onClick, ...rest } = props;

  const handleClick = e => {
    if (onClick) onClick(e);
    if (shouldIgnoreClick({ e, target })) {
      return;
    }

    if (href && href.match(/^http/)) return;

    e.preventDefault();
    context.router.history.push(href);
  };

  return <a {...rest} href={href} onClick={handleClick} />;
};

Link.contextTypes = {
  router: PropTypes.object
};

export default Link;
