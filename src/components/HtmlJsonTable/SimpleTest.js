import React from "react";

let teeest = ["Cloned1", "Cloned2", "Cloned3", "Cloned4", "Cloned5"];

let VarFunc = [];

let newProps;

function SimpleTest(props) {
  newProps = props;
  const { data } = props;

  console.log("🚀 ~ file: SimpleTest.js ~ line 5 ~ SimpleTest ~ data", data);
  return (
    <div>
      <table className="table table-striped table-bordered">
        <tbody>
          {Object.keys(data).map((k) => (
            <tr key={k}>
              {!Array.isArray(data) && <td>{k.replace(/_/g, " ")}</td>}
              {(() => {
                if (data[k] && typeof data[k] === "object") {
                  console.log("🚀 ~ file: SimpleTest.js ~ line 69 ~ VarFunc", VarFunc[0]);
                  let NewComp = VarFunc[0];
                  console.log("ciao");
                  return (
                    <td>
                      {
                        <NewComp />
                        // <SimpleTest2 data={data[k]} className="table table-striped table-bordered" />
                      }
                    </td>
                  );
                }
                return (
                  <td>
                    <span dangerouslySetInnerHTML={{ __html: data[k] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleTest;

function SimpleTest2(props) {
  const { data } = props;
  return (
    <div>
      <table className="table table-striped table-bordered">
        <tbody>
          {Object.keys(data).map((k) => (
            <tr key={k}>
              {!Array.isArray(data) && <td>{k.replace(/_/g, " ")}</td>}
              {(() => {
                if (data[k] && typeof data[k] === "object") {
                  return (
                    <td>
                      {
                        // <NewComponent data={data[k]} className="table table-striped table-bordered" />
                      }
                    </td>
                  );
                }
                return (
                  <td>
                    <span dangerouslySetInnerHTML={{ __html: data[k] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

teeest.map((opt) => {
  let Cloned = {
    [opt]: function () {
      const { data } = newProps;
      return (
        <div>
          <table className="table table-striped table-bordered">
            <tbody>
              {Object.keys(data).map((k) => (
                <tr key={k}>
                  {!Array.isArray(data) && <td>{k.replace(/_/g, " ")}</td>}
                  {(() => {
                    if (data[k] && typeof data[k] === "object") {
                      console.log("🚀 ~ file: SimpleTest.js ~ line 69 ~ VarFunc", VarFunc[1]);
                      let NewComp = VarFunc[1];
                      return (
                        <td>
                          {
                            // <NewComponent data={data[k]} className="table table-striped table-bordered" />
                          }
                        </td>
                      );
                    }
                    return (
                      <td>
                        <span dangerouslySetInnerHTML={{ __html: data[k] }} />
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
  VarFunc.push(Cloned);
});
