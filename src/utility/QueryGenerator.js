class QueryGenerator {
    constructor() {
    this._department_id = null;
    this._query = null;
    this._page = null;
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

    get params() {
        let params = {};
        if (this._department_id !== null && this._department_id !== '') {
            params.department_id = this._department_id;
        }
        if (this._query !== null && this._query !== '') {
          params.query = this._query;
        }
        if (this._page !== null) {
            params.page = this._page;
        }
        return params;
    }
}

export default QueryGenerator;