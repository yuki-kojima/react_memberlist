class ParamGenerator {
    constructor() {
        this.nickname = null;
        this.description = null;
        this.enterDate = null;
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

    get params() {
        const params = new URLSearchParams();
        console.log(params);

        if (this._nickname !== null && this._nickname !== "") {
            params.append('nickname', this._nickname);
        }
        if (this._description !== null && this._description !== "") {
            params.append('description', this._description);
        }
        if (this._enterDate !== null && this._enterDate !== "") {
            params.append('enter_date', this._enterDate);
        }
        console.log(params);
        return params;
    }
}

export default ParamGenerator;