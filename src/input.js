import React from "react";

const SelectDepartment = (props) => {
    return (
      <div className="inputwrap">
        <div className="departmentlist">
          <label className="departmentlist-label" for="department">
            部署
          </label>
          <div className="departmentlist-select">
            <select
              id="js-departmentID"
              name="department"
              onChange={e => props.onChangeDepartment(e)}
            >
              <option key="0" value="">
                指定しない
              </option>
              {props.departmentList.map((row, index) => {
                return (
                  <option key={index + 1} value={row.department_id}>
                    {row.department_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="l-freeword">
          <div className="freeword">
            <label className="freeword-label" for="freeword">
              キーワード
            </label>
            <input
              id="js-freeword"
              className="freeword__input"
              name="freeword"
              type="text"
              placeholder="キーワードを入れてください"
              onChange={e => props.onChangeText(e)}
            />
            <button
              onClick={e => props.onClick(e)}
              type="button"
              className="freeword__btn"
            >
              検索する
            </button>
          </div>
        </div>
      </div>
    );
};

export default SelectDepartment;