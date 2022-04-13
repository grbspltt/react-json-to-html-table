import React, { createRef } from "react";

const HtmlJsonTable = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect, OnselectAll, singleSelect, HeaderText, HeaderStyle } =
    props;

  let selected = [];
  function setSelected(event, key, value, keyValue) {
    //single selected options
    if (singleSelect && event.target.checked) {
      const radioboxes = document.querySelectorAll("input[type=radio]");
      radioboxes.forEach((cb) => {
        if (cb.id === event.target.id) {
          cb.checked = true;
        } else {
          cb.checked = false;
        }
      });
      selected = keyValue;
    } else if (singleSelect && !event.target.checked) {
      selected = [];
    }
    // normal select options
    else if (event.target.checked) {
      selected.push(keyValue);
    } else {
      const indexOfObject = selected.findIndex((object) => {
        return object[key] === value;
      });
      selected.splice(indexOfObject, 1);
    }
  }

  let allSelected = [];
  function setAllSelected(event, key, value, data, isMultiSelect) {
    let selectAllChecked = document.getElementById("#selectAll").checked;

    if (event.target.checked && isMultiSelect.isMultiSelect) {
      const checkboxes = document.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach((cb) => {
        cb.checked = true;
      });
      if (allSelected.length === 0) {
        Object.entries(data).map((opt) => {
          let Model = {
            [opt[0]]: opt[1],
          };
          allSelected.push(Model);
        });
      } else {
        allSelected = [];
        Object.entries(data).map((opt) => {
          let Model = {
            [opt[0]]: opt[1],
          };
          allSelected.push(Model);
        });
      }
    } else if (event.target.checked && !isMultiSelect.isMultiSelect) {
      allSelected.push(data);
    } else if (!event.target.checked && isMultiSelect.isMultiSelect) {
      const checkboxes = document.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach((cb) => {
        cb.checked = false;
      });
      allSelected = [];
    } else if (!event.target.checked && !isMultiSelect.isMultiSelect) {
      if (selectAllChecked) {
        const indexOfObject = allSelected.findIndex((object) => {
          return object[key] === value;
        });
        allSelected.splice(indexOfObject, 1);
        if (allSelected.length === 0) {
          const checkboxes = document.querySelectorAll("input[type=checkbox]");
          checkboxes.forEach((cb) => {
            cb.checked = false;
          });
        }
      } else {
        const indexOfObject = allSelected.findIndex((object) => {
          return object[key] === value;
        });
        allSelected.splice(indexOfObject, 1);
      }
    }
  }

  return (
    <div>
      <table>
        <thead style={HeaderStyle}>
          <tr>
            <th>{HeaderText}</th>
          </tr>
        </thead>
      </table>
      <table className={className}>
        <tbody>
          {OnselectAll && !singleSelect ? (
            <tr>
              <th>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="#selectAll"
                    onChange={(event) => {
                      setAllSelected(event, "fake1", "fake2", data, { isMultiSelect: true });
                      OnselectAll(event, allSelected);
                    }}
                  />
                </div>
              </th>
            </tr>
          ) : (
            <></>
          )}
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  {Onselect && singleSelect ? (
                    <td style={{ width: "2%" }}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={index}
                          onChange={(event) => {
                            setSelected(event, key, data[key], { [key]: data[key] });
                            Onselect(event, key, data[key], { [key]: data[key] }, selected);
                          }}
                        />
                      </div>
                    </td>
                  ) : Onselect ? (
                    <td style={{ width: "2%" }}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={index}
                          onChange={
                            !OnselectAll
                              ? (event) => {
                                  setSelected(event, key, data[key], { [key]: data[key] });
                                  Onselect(event, key, data[key], { [key]: data[key] }, selected);
                                }
                              : (event) => {
                                  setAllSelected(event, key, data[key], { [key]: data[key] }, { isMultiSelect: false });
                                  OnselectAll(event, allSelected);
                                }
                          }
                        />
                      </div>
                    </td>
                  ) : (
                    <></>
                  )}
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable2
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                        // Onselect={Onselect}
                        // OnselectAll={OnselectAll}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const HtmlJsonTable2 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable3
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable3 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable4
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable4 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable5
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable5 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable6
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable6 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable7
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable7 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable8
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable8 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable9
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const HtmlJsonTable9 = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  <td
                    onClick={
                      onClickKey
                        ? (event) => onClickKey(event, key, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "bold",
                      padding: "5px",
                      cursor: "default",
                    }}
                  >
                    {key.replace(/_/g, " ")}
                  </td>
                </>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td>
                      <HtmlJsonTable9
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                      />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={
                      onClickValue
                        ? (event) => onClickValue(event, data[key])
                        : () => {
                            return;
                          }
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: data[key] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HtmlJsonTable;
