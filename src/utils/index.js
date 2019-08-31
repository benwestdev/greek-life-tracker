/*
    Used for infinite scrolling pagination. 
    if user is at the bottom of page,
    and there are more records to retrieve, call the action to get more
*/
export const scrolledToBottomCallback = (error, loading, hasMore, action) => {
  if (error || loading || !hasMore) return;
  const scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  const scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight;
  const clientHeight =
    document.documentElement.clientHieght || window.innerHeight;
  const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  if (scrolledToBottom && hasMore) {
    action();
  }
};

export const convertQuerySnapshotToResults = querySnapshot => {
  const results = [];
  querySnapshot.forEach(doc => {
    results.push({ uid: doc.id, ...doc.data() });
  });
  return results;
};

const utils = {
  scrolledToBottomCallback,
  convertQuerySnapshotToResults
};
export default utils;
