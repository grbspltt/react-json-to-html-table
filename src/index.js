export * from "./components";
import React from "react";
import ReactDOM from "react-dom";
import HtmlJsonTable from "./components/HtmlJsonTable/HtmlJsonTable";

// import "./components/styles/HtmlJsonTable.css";

const data = {
  id: "0001",
  type: "donut",
  name: "Cake",
  ppu: 0.55,
  batters: {
    batter: [
      { id: "1001", type: "Regular" },
      { id: "1002", type: "Chocolate" },
      { id: "1003", type: "Blueberry" },
      { id: "1004", type: "Devil's Food" },
    ],
  },
  topping: [
    { id: "5001", type: "None" },
    { id: "5002", type: "Glazed" },
    { id: "5005", type: "Sugar" },
    { id: "5007", type: "Powdered Sugar" },
    { id: "5006", type: "Chocolate with Sprinkles" },
    { id: "5003", type: "Chocolate" },
    { id: "5004", type: "Maple" },
  ],
};

const data2 = {
  put: {
    description: "Update the SNMP settings for an organization",
    operationId: "updateOrganizationSnmp",
    parameters: [
      {
        name: "organizationId",
        in: "path",
        type: "string",
        required: true,
      },
      {
        name: "updateOrganizationSnmp",
        in: "body",
        schema: {
          type: "object",
          properties: {
            v2cEnabled: {
              type: "boolean",
              description: "Boolean indicating whether SNMP version 2c is enabled for the organization.",
            },
            v3Enabled: {
              type: "boolean",
              description: "Boolean indicating whether SNMP version 3 is enabled for the organization.",
            },
            v3AuthMode: {
              type: "string",
              enum: ["MD5", "SHA"],
              description: "The SNMP version 3 authentication mode. Can be either 'MD5' or 'SHA'.",
            },
            v3AuthPass: {
              type: "string",
              description: "The SNMP version 3 authentication password. Must be at least 8 characters if specified.",
            },
            v3PrivMode: {
              type: "string",
              enum: ["DES", "AES128"],
              description: "The SNMP version 3 privacy mode. Can be either 'DES' or 'AES128'.",
            },
            v3PrivPass: {
              type: "string",
              description: "The SNMP version 3 privacy password. Must be at least 8 characters if specified.",
            },
            peerIps: {
              type: "array",
              items: {
                type: "string",
              },
              description: "The list of IPv4 addresses that are allowed to access the SNMP server.",
            },
          },
          example: {
            v2cEnabled: false,
            v3Enabled: true,
            v3AuthMode: "SHA",
            v3PrivMode: "AES128",
            peerIps: ["123.123.123.1"],
          },
        },
      },
    ],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: "object",
        },
        examples: {
          "application/json": {
            v2cEnabled: false,
            v3Enabled: true,
            v3AuthMode: "SHA",
            v3PrivMode: "AES128",
            peerIps: ["123.123.123.1"],
            hostname: "snmp.meraki.com",
            port: 443,
          },
        },
      },
    },
    summary: "Update the SNMP settings for an organization",
    tags: ["organizations", "configure", "snmp"],
  },
};

function onClickKey(event, rowKey, rowValue) {
  console.log("td clicked rowKey", rowKey);
  console.log("td clicked rowValue", rowValue);
  event.stopPropagation();
  //   return event, rowKey, rowValue;
}
function onClickValue(event, rowValue) {
  console.log("td clicked rowValue", rowValue);
  event.stopPropagation();
  //   return event, rowValue;
}

function Onselect(event, key, value, keyValue, selected) {
  console.log("🚀 ~ file: index.js ~ line 35 ~ Onselect ~ selected", selected);
  //   //   console.log("🚀 ~ file: index.js ~ line 35 ~ Onselect ~ event", event);
  //   console.log("🚀 ~ file: HtmlJsonTable.js ~ line 7 ~ Onselect ~ keyValue", keyValue);
  //   console.log("🚀 ~ file: HtmlJsonTable.js ~ line 7 ~ Onselect ~ key", key);
  //   console.log("🚀 ~ file: HtmlJsonTable.js ~ line 7 ~ Onselect ~ value", value);
}
function OnselectAll(event, allSelected) {
  console.log("🚀 ~ file: index.js ~ line 35 ~ Onselect ~ allSelected", allSelected);
}

ReactDOM.render(
  <HtmlJsonTable
    data={data}
    className="table table-sm table-striped table-bordered table-responsive"
    onClickKey={onClickKey}
    onClickValue={onClickValue}
    Onselect={Onselect}
    OnselectAll={OnselectAll}
    singleSelect
  />,
  document.querySelector("#root")
);
