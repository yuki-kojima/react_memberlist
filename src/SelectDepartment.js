import React from "react";

const SelectDepartment = (props) => {
    return (
      <div className="l-departmentlist">
        <select
          id="js-departmentID"
          className="departmentlist"
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
    );
};

export default SelectDepartment;