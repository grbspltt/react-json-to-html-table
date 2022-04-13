import React from "react";

let OldProps;

const Test = (props) => {
  const { data, className, onClickKey, onClickValue, Onselect } = props;
  OldProps = props;

  let selected = [];
  function setSelected(isSelect, key, value, keyValue) {
    if (isSelect) {
      selected.push(keyValue);
    } else {
      const indexOfObject = selected.findIndex((object) => {
        return object[key] === value;
      });
      selected.splice(indexOfObject, 1);
    }
  }

  return (
    <div>
      <table className={className}>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <>
                  {Onselect ? (
                    <td style={{ width: "2%" }}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={index}
                          onChange={(event) => {
                            setSelected(event.target.checked, key, data[key], { [key]: data[key] });
                            Onselect(event, key, data[key], { [key]: data[key] }, selected);
                          }}
                        />
                      </div>
                    </td>
                  ) : (
                    <></>
                  )}
                  <td
                    onClick={(event) => onClickKey(event, key, data[key])}
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
                      {/* <NewComp
                        data={data[key]}
                        className={className}
                        onClickKey={onClickKey}
                        onClickValue={onClickValue}
                        Onselect={Onselect}
                      /> */}
                      <NewComp />
                    </td>
                  );
                }
                return (
                  <td
                    onClick={(event) => onClickValue(event, data[key])}
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

////////////////////////////

//////////////////////////////

let teeest = ["Name1", "Name2", "Name3", "Name4", "Name5"];

let VarFunc = [];

teeest.map((opt) => {
  let F = {
    [opt]: function () {
      const { data, className, onClickKey, onClickValue, Onselect } = OldProps;

      return (
        <div>
          <table className={className}>
            <tbody>
              {Object.keys(data).map((key, index) => (
                <tr key={key}>
                  {!Array.isArray(data) && (
                    <>
                      <td
                        onClick={(event) => onClickKey(event, key, data[key])}
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
                      //   var MyComponent = Components[opt];
                      //   React.createElement(MyComponent, {});
                      return (
                        <td>
                          {/* <MyComponent
                            data={data[key]}
                            className={className}
                            onClickKey={onClickKey}
                            onClickValue={onClickValue}
                            Onselect={Onselect}
                          /> */}
                        </td>
                      );
                    }
                    return (
                      <td
                        onClick={(event) => onClickValue(event, data[key])}
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
    },
  }[opt];

  VarFunc.push(F);
});

let NewComp = VarFunc[1];

export default Test;
