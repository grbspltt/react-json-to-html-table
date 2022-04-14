import React from "react";
import HtmlJsonTable from "../index";

export default {
  title: "Basic",
  component: HtmlJsonTable,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HtmlJsonTable {...args} />;

const data = {
  boolean_key: "--- true\n",
  empty_string_translation: "",
  key_with_description: "Check it out! This key has a description! (At least in some formats)",
  "key_with_line-break": "This translations contains\na line-break.",
  nested: {
    deeply: {
      key: "Wow, this key is nested even deeper.",
    },
    key: "This key is nested inside a namespace.",
  },
  null_translation: null,
  pluralized_key: {
    one: "Only one pluralization found.",
    other: "Wow, you have %s pluralizations!",
    zero: "You have no pluralization.",
  },
  sample_collection: ["first item", "second item", "third item"],
  simple_key: "Just a simple key with a simple message.",
  unverified_key: "This translation is not yet verified and waits for it. (In some formats we also export this status)",
};

const data2 = {
  problems: [
    {
      Diabetes: [
        {
          medications: [
            {
              medicationsClasses: [
                {
                  className: [
                    {
                      associatedDrug: [
                        {
                          name: "asprin",
                          dose: "",
                          strength: "500 mg",
                        },
                      ],
                      "associatedDrug#2": [
                        {
                          name: "somethingElse",
                          dose: "",
                          strength: "500 mg",
                        },
                      ],
                    },
                  ],
                  className2: [
                    {
                      associatedDrug: [
                        {
                          name: "asprin",
                          dose: "",
                          strength: "500 mg",
                        },
                      ],
                      "associatedDrug#2": [
                        {
                          name: "somethingElse",
                          dose: "",
                          strength: "500 mg",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          labs: [
            {
              missing_field: "missing_value",
            },
          ],
        },
      ],
      Asthma: [{}],
    },
  ],
};

const data3 = [
  { _id: "60beb338abe3dd4300d844b8", email: "hemitpatel0@gmail.com", typeVaccine: "Moderna", status: "Yes", __v: 0 },
  {
    _id: "60bf716b145de95f1c84fb2f",
    email: "hemit.2009@outlook.com",
    typeVaccine: "Asternzcana",
    status: "No",
    __v: 0,
  },
  { _id: "60bf7196145de95f1c84fb31", email: "hemitpatel@computer4u.com", typeVaccine: "Phizer", status: "Yes", __v: 0 },
  { _id: "60bf758f145de95f1c84fb32", email: "blahbro96@gmail.com", typeVaccine: "none", status: "No", __v: 0 },
  { _id: "60bf7cda145de95f1c84fb33", email: "vimal4282@yahoo.co.in", typeVaccine: "Moderna", status: "Yes", __v: 0 },
];

function onClickKey(event, rowKey, rowValue) {
  console.log("onClickKey - rowKey", rowKey);
  console.log("onClickKey - rowValue", rowValue);
  event.stopPropagation();
}

function onClickValue(event, rowValue) {
  console.log("onClickValuerowValue", rowValue);
  event.stopPropagation();
  //   return event, rowValue;
}

function Onselect(event, key, value, keyValue, selected) {
  console.log("Onselect selected", selected);
  console.log("Onselect keyValue", keyValue);
  console.log("Onselect key", key);
  console.log("Onselect value", value);
}
function OnselectAll(event, allSelected) {
  console.log("OnselectAll allSelected", allSelected);
}

let HeaderText = "react-json-to-html-table";
let HeaderStyle = { color: "white", backgroundColor: "black" };

//👇 Each story then reuses that template
export const Basic = Template.bind({});
Basic.args = {
  data: data,
  className: "table",
};
export const Onclicks = Template.bind({});
Onclicks.args = {
  data: data,
  className: "table table-sm table-striped table-bordered table-responsive",
  onClickKey: onClickKey,
  onClickValue: onClickValue,
};
export const SingleSelect = Template.bind({});
SingleSelect.args = {
  data: data,
  className: "table table-sm table-striped table-bordered table-responsive",
  Onselect: Onselect,
  OnselectAll: OnselectAll,
  singleSelect: true,
};
export const Select = Template.bind({});
Select.args = {
  data: data,
  className: "table table-sm table-striped table-bordered table-responsive",

  Onselect: Onselect,
};
export const SelectAll = Template.bind({});
SelectAll.args = {
  data: data,
  className: "table table-sm table-striped table-bordered table-responsive",
  Onselect: Onselect,
  OnselectAll: OnselectAll,
};
export const Header = Template.bind({});
Header.args = {
  data: data,
  className: "table table-sm table-striped table-bordered table-dark",
  Onselect: Onselect,
  OnselectAll: OnselectAll,
  HeaderText: HeaderText,
  HeaderStyle: HeaderStyle,
};

export const DeeplyNested = Template.bind({});
DeeplyNested.args = {
  data: data2,
  className: "table table-sm table-striped table-bordered",
};
export const MixedTables = Template.bind({});
MixedTables.args = {
  data: [data3, data2],
  className: "table table-sm table-striped table-bordered",
};
