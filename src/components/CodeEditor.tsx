import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-xcode";

import Settings from "./Settings";
import changeInitialLanguage from "../utils/languageSelector";
import axios from "axios";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
function CodeEditor() {
  const languages = ["c++", "java", "python"];
  const themes = ["monokai", "dracula", "github", "terminal", "xcode"];
  const fontSizes = ["14", "18", "20", "22"];
  const tabSizes = ["2", "4", "6", "8"];

  const [selectFontSize, setSelectFontSize] = useState(fontSizes[0]);
  const [selectTabSize, setSelectTabSize] = useState(tabSizes[0]);

  const [selectTheme, setSelectTheme] = useState(themes[0]);
  const [selectLanguage, setSelectLanguage] = useState(languages[1]);

  const [enableBasicAutoComplete, setEnableBasicAutoComplete] = useState(false);
  const [enableLiveAutoComplete, setEnableLiveAutoComplete] = useState(false);

  const [code, setCode] = useState(changeInitialLanguage(selectLanguage));
  const [open, setOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [disableRunCode, setDisableRunCode] = useState(false);
  const [checkCodeStatus, setCheckCodeStatus] = useState(false);
  const [output, setOutput] = useState<any>();
  const [readOnly, setReadOnly] = useState(false);
  const [executionId, setExecutionId] = useState("");

  // to change code when language changes
  useEffect(() => {
    setCode(changeInitialLanguage(selectLanguage));
  }, [selectLanguage]);

  // to check status of code i.e processing or queued and then finally show output
  async function checkStatusAndShowOutput() {
    try {
      const { data }: any = await axios.get(
        `https://coding-machine-api.herokuapp.com/check-status/${executionId}`
      );
      if (data.data !== "completed") {
        setTimeout(() => {
          checkStatusAndShowOutput();
          setCheckCodeStatus(false);
        }, 500);
      } else {
        const { data } = await axios.get(
          `https://coding-machine-api.herokuapp.com/result/${executionId}`
        );
        console.log(data);
        setOutput(data.data);
        setDisableRunCode(false);
        setReadOnly(false);
      }
    } catch (error) {
      setOutput("");
    }
  }

  function CustomButton() {
    if (!checkCodeStatus) {
      return (
        <button
          className={classNames(
            disableRunCode
              ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              : "w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          )}
          disabled={disableRunCode}
          onClick={() => execute()}
        >
          Run Code
        </button>
      );
    } else {
      return (
        <>
          <div className="flex justify-center">
            <InfinitySpin color="grey" width="100" />
          </div>
          <button
            className="w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            disabled={true}
          >
            Processing Please wait
          </button>
        </>
      );
    }
  }

  useEffect(() => {
    const init = async () => {
      if (checkCodeStatus) {
        checkStatusAndShowOutput();
      }
    };
    init();
  }, [checkCodeStatus]);

  function onChange(newValue: string) {
    setCode(newValue);
  }

  async function execute() {
    setSubmitted(true);
    setDisableRunCode(true);
    setReadOnly(true);
    try {
      axios
        .get("https://coding-machine-worker.herokuapp.com/")
        .then(() => {})
        .catch(async () => {
          const { data } = await axios.post(
            "https://coding-machine-api.herokuapp.com/submit",
            {
              code,
              language: selectLanguage,
            }
          );
          if (data.status === "ok") {
            setExecutionId(data.data);
            setCheckCodeStatus(true);
          } else {
            setDisableRunCode(false);
            setReadOnly(false);
          }
        });
    } catch (error) {
      setSubmitted(false);
      setDisableRunCode(false);
      setReadOnly(false);
    }
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <button onClick={() => setOpen(!open)}>
          Click to change settings of editor
        </button>
        <div className="px-4 py-6 sm:px-0">
          <AceEditor
            placeholder="Placeholder Text"
            mode={selectLanguage}
            theme={selectTheme}
            name="code-editor"
            fontSize={parseInt(selectFontSize)}
            width={"100%"}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            onChange={onChange}
            setOptions={{
              enableBasicAutocompletion: enableBasicAutoComplete,
              enableLiveAutocompletion: enableLiveAutoComplete,
              showLineNumbers: true,
              tabSize: parseInt(selectTabSize),
              readOnly: readOnly,
            }}
          />
        </div>
        <CustomButton />
        {submitted && (
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Output:- {output?.output!}
            </h3>
            <p>
              Time Taken:-
              {new Date(output?.completedAt).valueOf() -
                new Date(output?.startedAt).valueOf()}
              {" ms "}
            </p>
            <p> FileName:- {output?.fileName}</p>
          </div>
        )}
      </div>
      <Settings
        open={open}
        language={selectLanguage}
        theme={selectTheme}
        fontSize={selectFontSize}
        tabSize={selectTabSize}
        basicAutoComplete={enableBasicAutoComplete}
        liveAutoComplete={enableLiveAutoComplete}
        setOpen={setOpen}
        setFontSize={setSelectFontSize}
        setTheme={setSelectTheme}
        setLanguage={setSelectLanguage}
        setBasicAutoComplete={setEnableBasicAutoComplete}
        setLiveAutoComplete={setEnableLiveAutoComplete}
        setTabSize={setSelectTabSize}
      />
    </main>
  );
}

export default CodeEditor;
