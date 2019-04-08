class QueryGenerator {
  constructor() {
    this._department_id = null;
    this._query = null;
    this._page = 1;
    this.nickname = null;
    this.description = null;
    this.enterDate = null;
  }

  set department_id(ID) {
    this._department_id = ID;
  }

  set query(query) {
    this._query = query;
  }

  set page(page) {
    this._page = page;
  }

  set nickname(name) {
    this._nickname = name;
  }

  set description(comment) {
    this._description = comment;
  }

  set enterDate(date) {
    this._enterDate = date;
  }

  get queryString() {
    const params = [];
    let paramString = "";
    let queryString = "";
    if (this._department_id !== null && this._department_id !== "") {
      params.push(`department_id=${this._department_id}`);
    }
    if (this._query !== null && this._query !== "") {
      params.push(`query=${this._query}`);
    }
    if (this._page !== null) {
      params.push(`page=${this._page}`);
    }
    if (this._nickname !== null && this._nickname !== "") {
        params.push(`nickname=${this._nickname}`);
    }
    if (this._description !== null && this._description !== "") {
        params.push(`description=${this._description}`);
    }
    if (this._enterDate !== null && this._enterDate !== "") {
        params.push(`enter_date=${this._enterDate}`);
    }
    paramString = params.join("&");
    queryString = `?${paramString}`;
    return queryString;
  }
}

export default QueryGenerator;