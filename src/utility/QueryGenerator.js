class QueryGenerator {
    constructor() {
    this._department_id = null;
    this._query = null;
    this._page = 1;
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

    get queryString() {
        const params = [];
        let paramString = "";
        let queryString = '';
        if (this._department_id !== null && this._department_id !== '') {
            params.push(`department_id=${this._department_id}`);
        }
        if (this._query !== null && this._query !== '') {
            params.push(`query=${this._query}`);
        }
        if (this._page !== null) {
            params.push(`page=${this._page}`);
        }
        paramString = params.join('&');
        queryString = `?${paramString}`;
        return queryString;
    }
}

export default QueryGenerator;