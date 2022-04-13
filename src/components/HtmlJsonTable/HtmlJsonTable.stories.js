import React from "react";

import HtmlJsonTable from "./HtmlJsonTable";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "HtmlJsonTable",
  component: HtmlJsonTable,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HtmlJsonTable {...args} />;

const data = {
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

//👇 Each story then reuses that template
export const Props = Template.bind({});
Props.args = {
  data: data,
  className: "table table-sm table-striped table-bordered",
};
