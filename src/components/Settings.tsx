import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Toggle from "./Toggle";
import SelectedMenu from "./SelectMenu";

type props = {
  open: boolean;
  basicAutoComplete: boolean;
  liveAutoComplete: boolean;
  language: string;
  theme: string;
  fontSize: string;
  tabSize: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFontSize: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setBasicAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setLiveAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setTabSize: React.Dispatch<React.SetStateAction<string>>;
};

export default function Settings({
  open,
  language,
  theme,
  fontSize,
  tabSize,
  liveAutoComplete,
  basicAutoComplete,
  setOpen,
  setFontSize,
  setTheme,
  setLanguage,
  setBasicAutoComplete,
  setLiveAutoComplete,
  setTabSize,
}: props) {
  const languages = ["c++", "java", "python"];
  const themes = ["monokai", "dracula", "github", "terminal", "xcode"];
  const fontSizes = ["14", "18", "20", "22"];
  const tabSizes = ["2", "4", "6", "8"];
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Editor Settings
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Change it as per your style and taste of programming.
                  </p>
                </div>
                <div className="mt-5 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Enable basic auto complete
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          Enables basic auto complete by using ctrl+space
                        </span>
                        <Toggle
                          enabled={basicAutoComplete}
                          setEnabled={setBasicAutoComplete}
                        />
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Enable full auto complete
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          Enables full auto complete
                        </span>
                        <Toggle
                          enabled={liveAutoComplete}
                          setEnabled={setLiveAutoComplete}
                        />
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Set Theme
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          Themes like monokai,dracula,github
                        </span>
                        <SelectedMenu
                          setSelected={setTheme}
                          listToDisplay={themes}
                          selected={theme}
                        />
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Set Language
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">c++,java,python</span>
                        <SelectedMenu
                          setSelected={setLanguage}
                          listToDisplay={languages}
                          selected={language}
                        />
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Set Font Size
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Select text size</span>
                        <SelectedMenu
                          setSelected={setFontSize}
                          listToDisplay={fontSizes}
                          selected={fontSize}
                        />
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Set Tab Size
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Select text size</span>
                        <SelectedMenu
                          setSelected={setTabSize}
                          listToDisplay={tabSizes}
                          selected={tabSize}
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
