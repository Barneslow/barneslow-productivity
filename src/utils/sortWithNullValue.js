const sortWithNullValue = (ascending) => {
  return function (a, b) {
    // equal items sort equally
    if (a.completedAt === b.completedAt) {
      return 0;
    }

    // nulls sort after anything else
    if (a.completedAt === null) {
      return 1;
    }
    if (b.completedAt === null) {
      return -1;
    }

    // otherwise, if we're ascending, lowest sorts first
    if (ascending) {
      return a.completedAt < b.completedAt ? -1 : 1;
    }
    // if descending, highest sorts first
    return a.completedAt < b.completedAt ? 1 : -1;
  };
};

export default sortWithNullValue;
