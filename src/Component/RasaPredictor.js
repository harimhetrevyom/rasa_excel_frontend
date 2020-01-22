import React, { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "react-table-6/react-table.css";
import { Container, Button, Grid, Paper } from "@material-ui/core";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import LoopIcon from "@material-ui/icons/Loop";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ExportCSV } from "./ExportCSV";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import Base from "../Base";
import SelectA from "react-select";
import Highlight from "react-highlighter";
import { Link, useHistory } from "react-router-dom";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
import Highlighter from "react-highlight-words";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  },
  typography: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 400
  },
  logoutButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "5px",
    paddingRight: "5px"
  },
  MuiPopoverPaper: {
    overflowX: "hidden",
    overflowY: "hidden"
  },
  text: {},
  highlightText: {
    color: "transparent",
    pointerEvents: "none",
    padding: "5px 8px",
    whiteSpace: "pre"
  },
  zeroPos: {
    position: "absolute",
    top: 0,
    left: 0
  },
  input: {
    background: "none",
    border: "none",
    width: "100%"
  }
}));
let EntityNames = [
  "SharedFolderAccess",
  "SoftwareName",
  "Hardware_Peripheral",
  "Software_Attribute",
  "UserId",
  "MobileNumber",
  "AssignReporttoPapd",
  "SharedFolderName",
  "SharedFolderAccess",
  "VirtualMachine"
];
let optionsForConfidenceFilter = [
  { value: { gt: "0.00", lt: "0.10" }, label: "0.00 to 0.10" },
  { value: { gt: "0.10", lt: "0.20" }, label: "0.10 to 0.20" },
  { value: { gt: "0.20", lt: "0.30" }, label: "0.20 to 0.30" },
  { value: { gt: "0.30", lt: "0.40" }, label: "0.30 to 0.40" },
  { value: { gt: "0.40", lt: "0.50" }, label: "0.40 to 0.50" },
  { value: { gt: "0.50", lt: "0.60" }, label: "0.50 to 0.60" },
  { value: { gt: "0.60", lt: "0.70" }, label: "0.60 to 0.70" },
  { value: { gt: "0.70", lt: "0.80" }, label: "0.70 to 0.80" },
  { value: { gt: "0.80", lt: "0.90" }, label: "0.80 to 0.90" },
  { value: { gt: "0.90", lt: "1.00" }, label: "0.90 to 1.00" }
];
var multiEntityArray = [];
function RasaPredictor() {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const classes = useStyles();
  const [data, setData] = useState();
  const [editId, setEditId] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [editCategory1, setEditCategory1] = useState(false);
  const [editCategory2, setEditCategory2] = useState(false);
  const [editCategory3, setEditCategory3] = useState(false);
  const [editIncidentRequest, setIncidentRequest] = useState(false);
  const [model, setModel] = React.useState("");
  const [prediction1, setPrediction1] = React.useState(null);
  const [prediction2, setPrediction2] = React.useState([]);
  const [prediction3, setPrediction3] = React.useState([]);
  const [confidence1, setConfidence1] = React.useState([]);
  const [confidence2, setConfidence2] = React.useState([]);
  const [confidence3, setConfidence3] = React.useState([]);
  const [confidence4, setConfidence4] = React.useState([]);
  const [entitiyPrediction, setEntitiyPrediction]=React.useState([]);
  


  const [incidentRequestPrediction, setIncidentPrediction] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);
  const [category1Data, setCategory1Data] = React.useState([]);
  const [category2Data, setCategory2Data] = React.useState([]);
  const [category3Data, setCategory3Data] = React.useState([]);
  const [category4Data, setCategory4Data] = React.useState([]);
  const [totalRecord, setTotalRecord] = React.useState(null);
  const [loading] = React.useState(false);
  const [currentRecords, setCurrentRecords] = React.useState(null);
  const [LoaderUpdate, setLoaderUpdate] = React.useState(false);
  const [LoaderTrain, setLoaderTrain] = React.useState(false);
  const [pageStartIndex, setPageStartIndex] = React.useState(1);
  const [pageEndIndex, setPageEndIndex] = React.useState(0);
  const [selectionText, setSelectionText] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [entityNameOption, setEntityNameOption] = React.useState(null);

  const [entityName, setEntityName] = React.useState(null);
  const [entityValue, setEntityValue] = React.useState(null);
  const [entityStart, setEntityStart] = React.useState(null);
  const [entityEnd, setEntityEnd] = React.useState(null);
  const [entityId, setEntityId] = React.useState(null);
  const [showPopover, setShowPopover] = useState(false);

  // const [entityName, setEntityName] = React.useState(null);
  // const [entityName, setEntityName] = React.useState(null);
  const [
    selectedOptionConfidence1,
    setSelectedOptionConfidence1
  ] = React.useState(null);
  const [
    selectedOptionConfidence2,
    setSelectedOptionConfidence2
  ] = React.useState(null);
  const [
    selectedOptionConfidence3,
    setSelectedOptionConfidence3
  ] = React.useState(null);
  const [
    selectedOptionConfidence4,
    setSelectedOptionConfidence4
  ] = React.useState(null);
  const [
    selectedOptionEntityName,
    setSelectedOptionEntityName
  ] = React.useState(null);

  const [selectedOption1, setSelectedOption1] = React.useState(null);
  const [selectedOption2, setSelectedOption2] = React.useState(null);
  const [selectedOption3, setSelectedOption3] = React.useState(null);
  const [selectedOption4, setSelectedOption4] = React.useState(null);
  const [selectedOptionArray1, setSelectedOptionArray1] = React.useState([]);
  const [selectedOptionArray2, setSelectedOptionArray2] = React.useState([]);
  const [selectedOptionArray3, setSelectedOptionArray3] = React.useState([]);
  const [selectedOptionArray4, setSelectedOptionArray4] = React.useState([]);

  const [fileNames, setFileNames] = React.useState([]);
  const [selectedFileName, setSelectedFileName] = React.useState(null);

  const [selectedFileNameForPredict, setSelectedFileNameForPredict] = React.useState(null);
  const [selectedFileNameArray, setSelectedFileNameArray] = React.useState([]);
  const [selectedFileForPredictArray, setSelectedFileForPredictArray] = React.useState([]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [
    selectedOptionConfidenceArray1,
    setSelectedOptionConfidenceArray1
  ] = React.useState(null);
  const [
    selectedOptionConfidenceArray2,
    setSelectedOptionConfidenceArray2
  ] = React.useState(null);
  const [
    selectedOptionConfidenceArray3,
    setSelectedOptionConfidenceArray3
  ] = React.useState(null);
  const [
    selectedOptionConfidenceArray4,
    setSelectedOptionConfidenceArray4
  ] = React.useState(null);

  function getData() {
    // console.log(process.env);

    let prediction1Array = [];
    let prediction2Array = [];
    let prediction3Array = [];
    let prediction4Array = [];
    let predictionEntity = [];
    let confidence1Array = [];
    let confidence2Array = [];
    let confidence3Array = [];
    let confidence4Array = [];
 
    let payload = {}
    if (selectedFileForPredictArray.length > 0) {
      payload.FileName = selectedFileForPredictArray;
    }
    // console.log("payload", payload);
    
    axios.post("http://localhost:7000/getExcelData/getAllDataByFileName", payload).then(result => {
      // console.log("result", result);
      
      setData(result.data.data);
      setTotalRecord(result.data.data.length);
      let fileArray = [];
      let data1 = result.data.data;
      for (let i = 0; i < data1.length; i++) {
        if (data1[i].Category1 !== null || data1[i].Category1 !== undefined) {
          prediction1Array.push(data1[i].Category1);
        }
        if (
          data1[i].Confidence1 !== null ||
          data1[i].Confidence1 !== undefined
        ) {
          confidence1Array.push(data1[i].Confidence1);
        }
        if (
          data1[i].Confidence2 !== null ||
          data1[i].Confidence2 !== undefined
        ) {
          confidence2Array.push(data1[i].Confidence2);
        }
        if (
          data1[i].Confidence3 !== null ||
          data1[i].Confidence3 !== undefined
        ) {
          confidence3Array.push(data1[i].Confidence3);
        }
        if (
          data1[i].Confidence4 !== null ||
          data1[i].Confidence4 !== undefined
        ) {
          confidence4Array.push(data1[i].Confidence4);
        }
        if (data1[i].Category2 !== null || data1[i].Category2 !== undefined) {
          prediction2Array.push(data1[i].Category2);
        }
        if (data1[i].Category3 !== null || data1[i].Category3 !== undefined) {
          prediction3Array.push(data1[i].Category3);
        }
        if (
          data1[i].IncidentORRequest !== null ||
          data1[i].IncidentORRequest !== undefined
        ) {
          prediction4Array.push(data1[i].IncidentORRequest);
        }
        if (
          data1[i].Entity !== null ||
          data1[i].Entity !== undefined
        ) {
          predictionEntity.push(data1[i].Entity);
        }
        fileArray.push(data1[i].FileName);
      }
      let uniqueFileArray = [...new Set(fileArray)];

      axios
        .get("http://localhost:7000/category/getCategory")
        .then(catResult => {
          // console.log("catResult", catResult.data.data[0].category1);
          setCategory1Data(
            getOptionsForFilter(catResult.data.data[0].category1)
          );
          setCategory2Data(
            getOptionsForFilter(catResult.data.data[0].category2)
          );
          setCategory3Data(
            getOptionsForFilter(catResult.data.data[0].category3)
          );
          setCategory4Data(
            getOptionsForFilter(catResult.data.data[0].category4)
          );
          setFileNames(getOptionsForFilter(uniqueFileArray));
          setEntityNameOption(getOptionsForFilter(EntityNames));
        });
      setPrediction1(prediction1Array);
      setPrediction2(prediction2Array);
      setPrediction3(prediction3Array);
      setIncidentPrediction(prediction4Array);
      setEntitiyPrediction(predictionEntity)

      setConfidence1(confidence1Array);
      setConfidence2(confidence2Array);
      setConfidence3(confidence3Array);
      setConfidence4(confidence4Array);
    });
  }

  React.useEffect(() => {}, [pageNo]);

  const handleUploadFile = event => {
    const data = new FormData();
    data.append("myFile", event.target.files[0]);
    setFileData(data);
    axios
      .post("http://localhost:7000/upload/uploadEmailExcelFile", data)
      .then(response => {
        getData();
        get_50_records();
      });
  };

  let getOptionsForFilter = optionArray => {
    let dummyArray = [];
    optionArray.map((element, index) => {
      let dummyObject = { value: element, label: element };
      dummyArray.push(dummyObject);
    });
    return dummyArray;
  };

  const handleChange = event => {
    setModel(event.target.value);
  };

  const get_50_records = () => {
    let payload = {
      pageNo: pageNo,
      size: 50
    };
    if (selectedOptionArray1.length > 0) {
      payload.Category1 = selectedOptionArray1;
    }
    if (selectedOptionArray2.length > 0) {
      payload.Category2 = selectedOptionArray2;
    }
    if (selectedOptionArray3.length > 0) {
      payload.Category3 = selectedOptionArray3;
    }
    if (selectedOptionArray4.length > 0) {
      payload.IncidentORRequest = selectedOptionArray4;
    }
    if (selectedFileNameArray.length > 0) {
      payload.FileName = selectedFileNameArray;
    }
    if (selectedOptionConfidenceArray1 !== null) {
      payload.Confidence1 = selectedOptionConfidenceArray1;
    }
    if (selectedOptionConfidenceArray2 !== null) {
      payload.Confidence2 = selectedOptionConfidenceArray2;
    }
    if (selectedOptionConfidenceArray3 !== null) {
      payload.Confidence3 = selectedOptionConfidenceArray3;
    }
    if (selectedOptionConfidenceArray4 !== null) {
      payload.Confidence4 = selectedOptionConfidenceArray4;
    }

    axios
      .post("http://localhost:7000/getExcelData/getData", payload)
      .then(response => {
        // console.log("response", response.data.data._id);
        setCurrentRecords(response.data.data);
      });
  };

  React.useEffect(() => {
    // console.log("currentRecord", currentRecords);
    if (currentRecords !== null && currentRecords !== undefined) {
      currentRecords.forEach(element => {
        // console.log("element", element);

        element.Entity.forEach(elementEntity => {
          // console.log("elementEntity", elementEntity);

          if (element.Description.indexOf(elementEntity.EntityValue) !== -1) {
            let element = document.getElementById("des");
            // console.log("element", element);
          }
        });
      });
    }
  }, [currentRecords]);
  const handleChangeEdit = async (result, event, inputId) => {
    let column_name = inputId.name;
    console.log("resultCatwar", result.Category1);
    console.log("resultCatwar", result.Category1);
    let payload = {};
    if (column_name === "Category1") {
      payload = {
        _id: result._id,
        Category1: event.value,
        Category2: result.Category2,
        Category3: result.Category3,
        Confidence2: result.Confidence2,
        Confidence3: result.Confidence3,
        Confidence4: result.Confidence4,
        IncidentORRequest: result.IncidentORRequest,
        UpdatedBy: loginData.username,
        Entity: result.Entity
      };
    } else if (column_name === "Category2") {
      payload = {
        _id: result._id,
        Category1: result.Category1,
        Category2: event.value,
        Category3: result.Category3,
        Confidence1: result.Confidence1,
        Confidence3: result.Confidence3,
        Confidence4: result.Confidence4,
        IncidentORRequest: result.IncidentORRequest,
        UpdatedBy: loginData.username,
        Entity: result.Entity
      };
    } else if (column_name === "Category3") {
      payload = {
        _id: result._id,
        Category1: result.Category1,
        Category2: result.Category2,
        Category3: event.value,
        Confidence2: result.Confidence2,
        Confidence1: result.Confidence1,
        Confidence4: result.Confidence4,
        IncidentORRequest: result.IncidentORRequest,
        UpdatedBy: loginData.username,
        Entity: result.Entity
      };
    } else if (column_name === "Category4") {
      payload = {
        _id: result._id,
        Category1: result.Category1,
        Category2: result.Category2,
        Category3: result.Category3,
        Confidence2: result.Confidence2,
        Confidence3: result.Confidence3,
        Confidence1: result.Confidence1,
        IncidentORRequest: event.value,
        UpdatedBy: loginData.username,
        Entity: result.Entity
      };
    }
    // console.log("payload", payload);
    await axios
      .post("http://localhost:7000/updateExcel/updateData", payload)
      .then(response => {
        get_50_records();
      });
  };

  const updatePrediction = async event => {
    for (let i = 0; i < data.length; i++) {
      let payload = {
        _id: data[i]._id,
        Category1: prediction1[i],
        Category2: prediction2[i],
        Category3: prediction3[i],
        IncidentORRequest: incidentRequestPrediction[i],
        Confidence1: confidence1[i],
        Confidence2: confidence2[i],
        Confidence3: confidence3[i],
        Confidence4: confidence4[i],
        Entity: entitiyPrediction[i]
      };
      // console.log("payload", payload);
      setLoaderUpdate(true);
      await axios
        .post("http://localhost:7000/updateExcel/updateData", payload)
        .then(response => {
          // console.log(response); // do something with the response
        });
    }
    {
      get_50_records();
      toast.success("Records Predicted Successfully !", {
        position: toast.POSITION.TOP_CENTER
      });
      setLoaderUpdate(false);
    }
  };

  const rasaTrainModel = async event => {
    // console.log("event", model);
    if (model === 1) {
      let prediction = [];
      let confidence = [];
      for (let i = 0; i < data.length; i++) {
        setLoaderTrain(true);
        await axios
          .post("http://localhost:5006/model/parse", {
            text: data[i].Description
          })
          .then(async response => {
            prediction.push(response.data.intent.name);
            confidence.push(response.data.intent.confidence);
          });
      }
      setPrediction1(prediction);
      setConfidence1(confidence);
      {
        toast.success("Model 1 Trained Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        setLoaderTrain(false);
      }
    } else if (model === 2) {
      let prediction = [];
      let confidence = [];
      let entities=[];
      for (let j = 0; j < data.length; j++) {
        setLoaderTrain(true);
        await axios
          .post("http://localhost:5007/model/parse", {
            text: data[j].Description
          })
          .then(response => {
            prediction.push(response.data.intent.name);
            confidence.push(response.data.intent.confidence);
            entities.push(response.data.entities)
            

            console.log(response); // do something with the response
          });
      }
      // console.log(("Entities",entities));
      
      setPrediction2(prediction);
      setConfidence2(confidence);
      setEntitiyPrediction(entities)
      {
        toast.success("Model 2 Trained Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        setLoaderTrain(false);
      }
    } else if (model === 3) {
      let prediction = [];
      let confidence = [];
      setLoaderTrain(true);
      for (let x = 0; x < data.length; x++) {
        await axios
          .post("http://localhost:5008/model/parse", {
            text: data[x].Description
          })
          .then(response => {
            prediction.push(response.data.intent.name);
            confidence.push(response.data.intent.confidence);
            // console.log(response.data.intent.name); // do something with the response
          });
      }
      setPrediction3(prediction);
      setConfidence3(confidence);
      {
        toast.success("Model 3 Trained Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        setLoaderTrain(false);
      }
    } else if (model === 4) {
      let prediction = [];
      let confidence = [];
      for (let y = 0; y < data.length; y++) {
        setLoaderTrain(true);
        await axios
          .post("http://localhost:5005/model/parse", {
            text: data[y].Description
          })
          .then(response => {
            prediction.push(response.data.intent.name);
            confidence.push(response.data.intent.confidence);
            // console.log(response.data.intent.name); // do something with the response
          });
      }
      setIncidentPrediction(prediction);
      setConfidence4(confidence);
      {
        toast.success("Model 4 Trained Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        setLoaderTrain(false);
      }
    } else {
      {
        toast.error("Please select Model", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  };

  const onClickEditCategory1 = (result, event) => {
    setEditCategory1(true);
    setEditCategory2(false);
    setEditCategory3(false);
    setIncidentRequest(false);
    setEditId(result._id);
  };
  const onClickEditCategory2 = (result, event) => {
    setEditCategory2(true);
    setEditCategory1(false);
    setEditCategory3(false);
    setIncidentRequest(false);
    setEditId(result._id);
  };
  const onClickEditCategory3 = (result, event) => {
    setEditCategory3(true);
    setEditCategory1(false);
    setEditCategory2(false);
    setIncidentRequest(false);
    setEditId(result._id);
  };
  const onClickeditIncidentRequest = (result, event) => {
    setIncidentRequest(true);
    setEditCategory1(false);
    setEditCategory2(false);
    setEditCategory3(false);
    setEditId(result._id);
  };

  React.useEffect(() => {
    setPageEndIndex(pageNo * 50);
    getData();
    get_50_records();
  }, [pageNo]);
  const onClickNext = () => {
    setPageNo(pageNo + 1);
    setPageStartIndex(pageEndIndex + 1);
  };
  const onClickPrevious = () => {
    setPageNo(pageNo - 1);
    setPageStartIndex(pageStartIndex - 50);
    setPageEndIndex(pageEndIndex - 50);
  };

  let handleChangeFileName = selectedOption => {
    setSelectedFileName(selectedOption);
    let dummyArray = [];
    if (selectedOption !== null && selectedOption !== undefined) {
      selectedOption.forEach(element => {
        dummyArray.push(element.value);
      });
    }

    setSelectedFileNameArray(dummyArray);
  };

  React.useEffect(() => {
    get_50_records();
  }, [selectedFileNameArray]);
  
// ------------------------------Select File for Predict -----------------------------------------------

  let handleChangeSelectFile = selectedOption => {
    setSelectedFileNameForPredict(selectedOption);
    let dummyArray = [];
    if (selectedOption !== null && selectedOption !== undefined) {
      selectedOption.forEach(element => {
        dummyArray.push(element.value);
      });
    }

    setSelectedFileForPredictArray(dummyArray);
  };

  React.useEffect(() => {
    getData()
  }, [selectedFileForPredictArray]);

  // -------------------------------------------------------------------------------------------------------

  let handleChangeFilter1 = selectedOption => {
    setSelectedOption1(selectedOption);
    let dummyArray = [];
    if (selectedOption !== null && selectedOption !== undefined) {
      selectedOption.forEach(element => {
        dummyArray.push(element.value);
      });
    }

    setSelectedOptionArray1(dummyArray);
  };
  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionArray1]);

  let handleChangeFilter2 = selectedOption => {
    setSelectedOption2(selectedOption);
    let dummyArray = [];

    if (selectedOption !== null && selectedOption !== undefined) {
      selectedOption.forEach(element => {
        dummyArray.push(element.value);
      });
    }
    setSelectedOptionArray2(dummyArray);
  };

  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionArray2]);

  let handleChangeFilter3 = selectedOption => {
    setSelectedOption3(selectedOption);
    let dummyArray = [];
    if (selectedOption !== null && selectedOption !== undefined) {
      selectedOption.forEach(element => {
        dummyArray.push(element.value);
      });
    }
    setSelectedOptionArray3(dummyArray);
  };
  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionArray3]);

  let handleChangeFilter4 = selectedOption => {
    setSelectedOption4(selectedOption);
    let dummyArray = [];
    if (selectedOption !== null && selectedOption !== undefined) {
      selectedOption.forEach(element => {
        dummyArray.push(element.value);
      });
    }
    setSelectedOptionArray4(dummyArray);
  };
  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionArray4]);

  //-------------------------Confidence1 Filter----------------------------------------

  let handleChangeConfidencrFilter1 = selectedOption => {
    setSelectedOptionConfidence1(selectedOption);
    setSelectedOptionConfidenceArray1(selectedOption.value);
  };

  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionConfidenceArray1]);

  //------------------------------------------------------------------------------------

  let handleChangeConfidencrFilter2 = selectedOption => {
    setSelectedOptionConfidence2(selectedOption);
    setSelectedOptionConfidenceArray2(selectedOption.value);
  };

  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionConfidenceArray2]);

  //------------------------------------------------------------------------------------

  let handleChangeConfidencrFilter3 = selectedOption => {
    setSelectedOptionConfidence3(selectedOption);
    setSelectedOptionConfidenceArray3(selectedOption.value);
  };

  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionConfidenceArray3]);

  //--------------------------------------------------------------------------------

  let handleChangeConfidencrFilter4 = selectedOption => {
    setSelectedOptionConfidence4(selectedOption);
    setSelectedOptionConfidenceArray4(selectedOption.value);
  };

  React.useEffect(() => {
    get_50_records();
  }, [selectedOptionConfidenceArray1]);

  //----------------------------------------------------------------------------------

  const handleChangeEntityNameOption = selectedOption => {
    setSelectedOptionEntityName(selectedOption);
    // console.log("event", event.target.id);

    setEntityName(selectedOption.value);
    setAnchorEl(null);
  };
  let dummyArrayForDelete = [];
  const handleChangeDelete = (event, result) => {
    if (event.target.checked) {
      dummyArrayForDelete.push(event.target.value);
    }

    if (!event.target.checked) {
      const index = dummyArrayForDelete.indexOf(event.target.value);
      if (index > -1) {
        dummyArrayForDelete.splice(index, 1);
      }
    }
  };

  let onClickSelectAll = event => {
    var checkboxes = document.getElementsByTagName("input");
    if (event.target.checked) {
      for (var i = 1; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
          checkboxes[i].checked = true;
          if (checkboxes[i].value !== "") {
            dummyArrayForDelete.push(checkboxes[i].value);
          }
        }
      }
    } else {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
          checkboxes[i].checked = false;
          const index = dummyArrayForDelete.indexOf(checkboxes[i].value);
          if (index > -1) {
            dummyArrayForDelete.splice(index, 1);
          }
        }
      }
    }
  };
  let onClickDelete = () => {
    let payload = {
      deleteIDs: dummyArrayForDelete
    };

    axios.post("http://localhost:7000/deleteDate/delete", payload).then(res => {
      get_50_records();
      var checkboxes = document.getElementsByTagName("input");
      for (var i = 1; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
          checkboxes[i].checked = false;
        }
      }
    });
  };

  const handleEvent = (event, result) => {
    setEntityName(null)
    setSelectedOptionEntityName(null);
    // console.log("resutekw", result);
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (entityId !== result._id) {
      multiEntityArray = [...result.Entity];
    }
    setEntityId(result._id);

    if (event.type === "mousedown") {
      // console.log("ondown");

    } else {
      // console.log("onup");
      let selection = window.getSelection().toString();
      setEntityValue(selection);
      let str = result.Description
    
      let start = str.indexOf(selection);
      setEntityStart(start);
      console.log("start Type", start);
      
      let str2Lenght = selection.length - 1;
      let end = start + str2Lenght;
      setEntityEnd(end);
      // console.log("entity", entityName);
      // console.log("end Type",typeof end);

      setSelectionText(selection);
    }
  };
  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;


  React.useEffect(() => {
    if (entityName !== null) {
      let dummyObject = {
        entity: entityName,
        value: entityValue,
        start: entityStart,
        end: entityEnd + 1
      };
                                                                                        
      multiEntityArray.push(dummyObject);
     

      let uniqueEntityArr = multiEntityArray.filter(function (a) {
        var key = a.entity + '&' + a.value +'&' + a.start + '&' + a.end;
        if (!this[key]) {
            this[key] = true;
            return true;
        }
    }, Object.create(null));

      let payload = {
        id: entityId,
        Entity: uniqueEntityArr
      };
      // console.log("payload", payload);
      axios
        .post("http://localhost:7000/getExcelData/updateEntity", payload)
        .then(res => {
          get_50_records();
        });
    }
  }, [entityName]);

  // const Highlight = ({ children, highlightIndex }) => (
  //   <strong className="highlighted-text">{children}</strong>
  // );

  return (
    <Base>
    <LoadingOverlay
      active={LoaderTrain || LoaderUpdate}
      spinner
      text="Loading your content..."
      style={[{ height: 80 }]}
      padding="0"
    >
      <div style={{ textAlign: "left" }}>
        <Container maxWidth="lg" className={classes.root}>
          <input
            style={{ display: "none" }}
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={event => handleUploadFile(event)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Excel
            </Button>
          </label>
          <FormControl variant="outlined" style={{ width: "12%" }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select Model
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={model}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="">
                <em>Select Model</em>
              </MenuItem>
              <MenuItem value={1}>Model 1</MenuItem>
              <MenuItem value={2}>Model 2</MenuItem>
              <MenuItem value={3}>Model 3</MenuItem>
              <MenuItem value={4}>Model 4</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ width: "12%" }}>
            <SelectA
              value={selectedFileNameForPredict}
              onChange={handleChangeSelectFile}
              options={fileNames}
              isMulti={true}
              placeholder="Select File"
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoopIcon />}
            disabled={loading || selectedFileNameForPredict === null }
            size="small"
            onClick={event => rasaTrainModel(event)}
          >
            Predict{" "}
            {LoaderTrain && <CircularProgress size={24} color="inherit" />}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={loading || selectedFileNameForPredict === null }
            startIcon={<LoopIcon />}
            onClick={event => updatePrediction(event)}
            size="small"
          >
            Update{" "}
            {LoaderUpdate && <CircularProgress size={24} color="inherit" />}
          </Button>
          <ExportCSV />
          Current User: <strong>{loginData.username}</strong>
        </Container>
       

        <Container maxWidth="lg" style={{ marginTop: "1px" }}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Table striped bordered hover>
                <thead style={{ backgroundColor: "#F6DDCC" }}>
                  <tr>
                    <th>Index</th>
                    <th>
                      <div>

                        <SelectA
                          value={selectedFileName}
                          onChange={handleChangeFileName}
                          options={fileNames}
                          isMulti={true}
                          placeholder="Filter"
                        />
                      </div>
                      File Name
                    </th>
                    <th>UpdatedBy</th>
                    <th>Description</th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOption1}
                          onChange={handleChangeFilter1}
                          options={category1Data}
                          isMulti={true}
                          placeholder="Filter"
                        />
                      </div>
                      Category 1
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOptionConfidence1}
                          onChange={handleChangeConfidencrFilter1}
                          options={optionsForConfidenceFilter}
                          isMulti={false}
                          placeholder="Filter"
                        />
                      </div>
                      Confidence
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOption2}
                          onChange={handleChangeFilter2}
                          options={category2Data}
                          isMulti={true}
                          placeholder="Filter"
                        />
                      </div>
                      Category 2
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOptionConfidence2}
                          onChange={handleChangeConfidencrFilter2}
                          options={optionsForConfidenceFilter}
                          isMulti={false}
                          placeholder="Filter"
                        />
                      </div>
                      Confidence
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOption3}
                          onChange={handleChangeFilter3}
                          options={category3Data}
                          isMulti={true}
                          placeholder="Filter"
                        />
                      </div>
                      Category 3
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOptionConfidence3}
                          onChange={handleChangeConfidencrFilter3}
                          options={optionsForConfidenceFilter}
                          isMulti={false}
                          placeholder="Filter"
                        />
                      </div>
                      Confidence
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOption4}
                          onChange={handleChangeFilter4}
                          options={category4Data}
                          isMulti={true}
                          placeholder="Filter"
                        />
                      </div>
                      Incident/Request
                    </th>
                    <th>
                      <div>
                        <SelectA
                          value={selectedOptionConfidence4}
                          onChange={handleChangeConfidencrFilter4}
                          options={optionsForConfidenceFilter}
                          isMulti={false}
                          placeholder="Filter"
                        />
                      </div>
                      Confidence
                    </th>
                    <th style={{ textAlign: "center" }}>
                      {" "}
                      <div style={{ paddingRight: "15px" }}>
                        <label>
                          <div class="form-check">
                            <input
                              type="checkbox"
                              value={null}
                              class="form-check-input"
                              id="checkbox"
                              onChange={onClickSelectAll}
                            />
                            <DeleteIcon
                              onClick={onClickDelete}
                              className={classes.curser}
                            />
                          </div>
                        </label>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords !== undefined && currentRecords !== null
                    ? currentRecords.map((result, index) => {
                        let entityArray = result.Entity.map((entity, index) => {
                          if (
                            entity.value !== null &&
                            entity.value !== undefined
                          ) {
                            return entity.value.toString();
                          }
                        });
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{result.FileName}</td>
                            <td>{result.UpdatedBy}</td>
                            
                            <td>
                           {/* <Tooltip title="entity"> */}
                              <span>
                              <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={entityArray}
                                autoEscape={true}
                                textToHighlight={result.Description}
                                onMouseUp={event => handleEvent(event, result)}
                                highlightStyle={{
                                  backgroundColor: "#e0de36"
                                }}
                              />
                              </span>
                              {/* </Tooltip> */}
                            </td>
                            
                            {editCategory1 && result._id === editId ? (
                              <td>
                                <SelectA
                                  name="Category1"
                                  onChange={(event, inputId) =>
                                    handleChangeEdit(result, event, inputId)
                                  }
                                  options={category1Data}
                                  isMulti={false}
                                  placeholder="Filter"
                                />
                              </td>
                            ) : (
                              <td onClick={() => onClickEditCategory1(result)}>
                                {result.Category1}
                              </td>
                            )}
                            <td>{result.Confidence1}</td>

                            {editCategory2 && result._id === editId ? (
                              <td>
                                <SelectA
                                  name="Category2"
                                  onChange={(event, inputId) =>
                                    handleChangeEdit(result, event, inputId)
                                  }
                                  options={category2Data}
                                  isMulti={false}
                                  placeholder="Filter"
                                />
                              </td>
                            ) : (
                              <td onClick={() => onClickEditCategory2(result)}>
                                {result.Category2}
                              </td>
                            )}
                            <td>{result.Confidence2}</td>
                            {editCategory3 && result._id === editId ? (
                              <td>
                                <SelectA
                                  name="Category3"
                                  onChange={(event, inputId) =>
                                    handleChangeEdit(result, event, inputId)
                                  }
                                  options={category3Data}
                                  isMulti={false}
                                  placeholder="Filter"
                                />
                              </td>
                            ) : (
                              <td onClick={() => onClickEditCategory3(result)}>
                                {result.Category3}
                              </td>
                            )}
                            <td>{result.Confidence3}</td>
                            {editIncidentRequest && result._id === editId ? (
                              <td>
                                <SelectA
                                  name="Category4"
                                  onChange={(event, inputId) =>
                                    handleChangeEdit(result, event, inputId)
                                  }
                                  options={category4Data}
                                  isMulti={false}
                                  placeholder="Filter"
                                />
                              </td>
                            ) : (
                              <td
                                onClick={() =>
                                  onClickeditIncidentRequest(result)
                                }
                              >
                                {result.IncidentORRequest}
                              </td>
                            )}
                            <td>{result.Confidence4}</td>
                            <td>
                              <div class="form-check">
                                <input
                                  type="checkbox"
                                  value={result._id}
                                  class="form-check-input"
                                  id="checkbox"
                                  onClick={e => handleChangeDelete(e, result)}
                                />
                                <DeleteIcon
                                  onClick={onClickDelete}
                                  className={classes.curser}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </Grid>
            <Grid item lg={12}>
              <div className="box-footer">
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    {pageNo === 0 ? null : (
                      <div
                        className="dataTables_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {pageStartIndex} to {pageEndIndex} of{" "}
                        {totalRecord} entries
                      </div>
                    )}
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div className="dataTables_paginate">
                      <ul className="pagination">
                        {pageNo === 1 || pageNo === 0 ? null : (
                          <li
                            className="page-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => onClickPrevious()}
                          >
                            <a
                              aria-label="Previous"
                              className="page-link page-link"
                            >
                              <span>Previous</span>
                            </a>
                          </li>
                        )}
                        {pageNo === 0 ? null : (
                          <li className="page-item active">
                            <a className="page-link page-link">
                              {pageNo}
                              <span className="sr-only">(current)</span>
                            </a>
                          </li>
                        )}
                        {pageNo === 0 ? null : (
                          <li
                            className="page-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => onClickNext()}
                          >
                            <a
                              aria-label="Next"
                              className="page-link page-link"
                            >
                              <span>Next</span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <ToastContainer />
        </Container>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div style={{ marginRight: "100px", width: "100px" }}>
          <SelectA
            value={selectedOptionEntityName}
            onChange={handleChangeEntityNameOption}
            options={entityNameOption}
            isMulti={false}
            placeholder="Filter"
          />
        </div>
      </Popper>{" "}
    </LoadingOverlay>

    </Base>
  );
}

export default withStyles(useStyles)(RasaPredictor);
