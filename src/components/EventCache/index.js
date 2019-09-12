import firebase from "../Firebase/firebase";

export default class EventCache {
  constructor(resultsHandler, loadingHandler) {
    this.resultsHandler = resultsHandler;
    this.loadingHandler = loadingHandler;

    this.query = "";
    this.cache = {};
  }

  changeQuery(query) {
    this.loadingHandler(true);
    if (this.cache[query]) {
      this.resultsHandler(this.cache[query]);
      this.loadingHandler(false);
    } else {
      const dates = firebase.EventApi.buildDateRangeCriteria(query);
      firebase.EventApi.getEvents(dates).then(results => {
        this.cache[query] = results;
        this.resultsHandler(results);
        this.loadingHandler(false);
      });
    }
  }
}
