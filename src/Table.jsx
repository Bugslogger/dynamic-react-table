/**
 *
 *  This table can be used anywhere and in any project.
 *  and you can also customize it according to you.
 *
 * NOTE: do not customize untill you really need to do it.
 *       Otherwise it will break the table everywhere wherever this table is used.
 *
 *      If you have any suggetions please let me know. if it's helpfull to improve this Table compoent.
 *      we will impliment it.
 *
 *      If there's any problem please read dynamictable.txt
 *      you will find this file in the same directory of this file.
 *
 *      - Sarfaraj Shah [MrDark]
 *
 */

import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

// react icons
import { GoArrowUp, GoArrowDown } from "react-icons/go";

const DynamicTable = ({
  cols,
  response,
  isPaginate,
  headerClass,
  rowHover,
  numberOfData,
  isBgTransparent,
  PaginationOnButtonClick,
  fixedHeight,
  hideHeader,
}) => {
  const [data, setdata] = useState([]);
  const [order, setOrder] = useState("asc"); // change sorting order of data in table
  const [toggleTable, setToggleTable] = useState(false); // responsible for re-rendering the table compoent only.
  const [toggleArrowIcon, settoggleArrowIcon] = useState({});

  useEffect(() => {
    setdata(response);
  }, [response, toggleTable]);

  /**
   *
   * @param {String} filedName
   * @param {Boolean} isFieldSortable
   *
   * `sortingfunction(filedName, isFieldSortable)` function is responsible for sorting the table data
   *  in ascending or descending order.
   *
   *  This method takes two parameter:
   *  1. fieldName as [string]
   *  field name is nothing but name of key(object property form response).
   *  and key name is case-sensitive if you misspelled key name then sorting will not work.
   *
   *  NOTE: pass the key name same as you see response.
   * [here response is a props. and this prop has array of object Ex: [{name: "Sarfaraj Shah", age: 24}]. here name & age is a key ]
   *
   *  2. isFieldSortable as [boolean]
   *     This is a boolean value which tells your table column that if this column is sortable of not.
   *      if you pass it as `false` then you are not able to sort with that particular column where you setting it to false.
   *
   *     Ex: let say you have 3 column in table. Date, Name, Age. Now suppose you set `isFieldSortable = false` for Date column.
   *         and for others like name and age you set it to `true`.
   *
   *        Now you are able to sort by clicking on `name` & `age` but you are not able to sort with `date`.
   *        coz you set it to `false`.
   *
   *
   *      Warning: Please dynamictable.txt for full info about the working of table.
   *      - Sarfaraj Shah [MrDark]
   *
   *
   */

  function sortingfunction(filedName, isFieldSortable) {
    if (!isFieldSortable) return; // checks if the field is sortable not iif not sortable then terminate the code here.

    if (order === "asc") {
      /**
       * this code will arrange response in ascending order
       */
      response?.sort((a, b) =>
        typeof a[filedName] === "number" || typeof b[filedName] === "number"
          ? a[filedName] > b[filedName]
            ? 1
            : -1
          : a[filedName]?.toLowerCase() > b[filedName]?.toLowerCase()
          ? 1
          : -1
      );
      setToggleTable(!toggleTable);
      setOrder("desc");
      settoggleArrowIcon({ [filedName]: { up: false, down: true } }); // do not use spread operator for this state.
    }

    if (order === "desc") {
      /**
       * this code will arrange response in descending order
       */
      response?.sort((a, b) =>
        typeof a[filedName] === "number" || typeof b[filedName] === "number"
          ? a[filedName] < b[filedName]
            ? 1
            : -1
          : a[filedName]?.toLowerCase() < b[filedName]?.toLowerCase()
          ? 1
          : -1
      );
      setToggleTable(!toggleTable);
      setOrder("asc");
      settoggleArrowIcon({ [filedName]: { up: true, down: false } }); // do not use spread operator for this state.
    }

    function RenderIcons(head) {
      /**
       * Not in use
       */
      if (toggleArrowIcon[head?.key]?.up && head?.isSortable) {
        order = "asc";
        return <GoArrowUp className="mx-2 text-primary" />;
      }
      if (toggleArrowIcon[head?.key]?.down && head?.isSortable) {
        order = "desc";
        return <GoArrowDown className="mx-2 text-primary" />;
      }
      return "";
    }
  }

  return (
    <div
      className={`w-full ${
        isBgTransparent ? "bg-transparent" : "bg-white shadow-sm rounded-sm"
      }`}
    >
      <div
        className="overflow-x-auto"
        style={{ overflowY: "auto", height: fixedHeight ? "400px" : "" }}
      >
        <table className="max-w-full min-w-full break-keep border-collapse">
          {!hideHeader && (
            <thead className="border">
              <tr className={headerClass}>
                {cols?.map((head, index) => {
                  return (
                    <th
                      onClick={() =>
                        head?.isSortable &&
                        sortingfunction(head?.key, head?.isSortable)
                      }
                      key={head?.id ? head?.id : index}
                      style={head?.headStyle}
                      className={`cursor-pointer basis-36 break-keep   p-4 border ${
                        head?.headClass ? head?.headClass : ""
                      }`}
                    >
                      <span className="truncate flex justify-start items-center">
                        {head?.title}{" "}
                        {toggleArrowIcon[head?.key]?.up && head?.isSortable ? (
                          <GoArrowUp className="mx-2 text-primary" />
                        ) : toggleArrowIcon[head?.key]?.down &&
                          head?.isSortable ? (
                          <GoArrowDown className="mx-2 text-primary" />
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {data?.length > 0 ? (
              data
                ?.slice(
                  0,
                  isPaginate && numberOfData ? numberOfData : data?.length
                )
                ?.map((vals) => (
                  <tr className={rowHover ? "hover:bg-gray-50" : ""}>
                    {cols?.map((val, index) => {
                      return (
                        <td
                          key={val?.id ? val?.id : index + 1}
                          id={val?.id}
                          style={val?.bodyStyle}
                          onClick={val?.click}
                          className={
                            val?.bodyClass
                              ? val?.bodyClass
                              : "border px-4 py-4 text-left"
                          }
                        >
                          {val?.isKey
                            ? val.render(vals[val.key], index)
                            : val.render(vals, index)}
                        </td>
                      );
                    })}
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  className="text-center uppercase py-5"
                  colSpan={cols.length}
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* pagination section  */}
      <div className="flex justify-center items-center mt-4 mb-2">
        {isPaginate && numberOfData < data.length && (
          <div
            onClick={PaginationOnButtonClick}
            className=" bg-blue-600 text-white rounded px-3 py-2 cursor-pointer"
          >
            Show More
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DynamicTable);

// DynamicTable.defaultProps = {
//   fixedHeight: true,
// };

DynamicTable.prototype = {
  cols: PropTypes.array.isRequired,
  response: PropTypes.any.isRequired,
};
