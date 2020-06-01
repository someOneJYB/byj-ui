export function mapChildren(child, cb) {
  if (Array.isArray(child)) {
    child.map((i, idx) => cb(i, idx));
  } else {
    return cb(child, 0);
  }
}
