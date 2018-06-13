// this is what store looks like, this is the object all reducers are dealing with

import {pipeline} from "../models/Pipeline";

export default {
  authors: [],
  courses: [],
  ajaxCallsInProgress: 0,
  pipes: pipeline,
  parameters: ["Section No.", "Description", "Horizontal Change (m)", "Vertical Change (m)", "ID (mm)", "Roughness (mm)", "Cores"]
};
