'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var AnotherExample = function AnotherExample(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/React.createElement("div", {
    className: "another-example"
  }, "This is another example by", name);
}; //

module.exports = AnotherExample;
