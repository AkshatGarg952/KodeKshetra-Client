import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from './CodeEditor';

function EditorPanel({ onRun, onSubmit, problem, setParentCode, setParentLanguage }) {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const isInitialLoad = useRef(true);

  const languageMap = { python: 71, java: 62, cpp: 54 };
  const languageId = languageMap[language];

  // Load code from sessionStorage or problem boilerplate on language/problem change
  useEffect(() => {
    let loadedCode = sessionStorage.getItem(language);
    let finalCode = '';
    if (loadedCode !== null) {
      finalCode = loadedCode;
    } else if (problem?.source === 'leetcode' && problem.boilerplateCode) {
      if (language === 'cpp') {
        finalCode = problem.boilerplateCode.cpp.code;
      } else {
        finalCode = problem.boilerplateCode[language]?.code || '';
      }
    } else {
      finalCode = '';
    }
    setCode(finalCode);
    setParentCode(finalCode);
    setParentLanguage(language);
    isInitialLoad.current = true;
  }, [problem, language]);

  // Save code in sessionStorage, except for the initial mount after code is restored
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    } else {
      sessionStorage.setItem(language, code);
    }
  }, [code, language]);

  return (
    <div className="editor-panel w-1/2 bg-[rgba(26,26,26,0.9)] backdrop-blur-[15px] border border-neon-green rounded-r-2xl rounded-l-none flex flex-col overflow-hidden shadow-lg h-full max-lg:w-full max-lg:rounded-2xl max-lg:m-1 max-lg:h-[60vh]">
      <div className="editor-header p-4 bg-gradient-to-br from-deep-black to-charcoal border-b border-neon-green flex justify-between items-center">
        <label htmlFor="languageSelect" className="text-sm text-gray-300 mr-2">Language:</label>
        <select
          id="languageSelect"
          className="bg-[rgba(0,0,0,0.8)] text-text-primary border-2 border-electric-purple p-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.4)]"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <CodeEditor
        language={language}
        problemId={problem?.problemId}
        code={code}
        setCode={setCode}
      />
      <div className="editor-footer flex justify-center items-center gap-5 p-5 bg-gradient-to-br from-deep-black to-charcoal border-t border-neon-green">
        <button
          id="runCodeBtn"
          className="px-4 py-2 bg-cyber-cyan text-black font-semibold rounded-lg hover:bg-cyber-cyan/80 transition"
          onClick={() => onRun(code, language, problem)}
        >
          <i className="fas fa-play mr-2"></i> Run Code
        </button>
        <button
          id="submitBtn"
          className="px-4 py-2 bg-electric-purple text-white font-semibold rounded-lg hover:bg-electric-purple/80 transition"
          onClick={() => onSubmit(code, language, problem)}
        >
          <i className="fas fa-paper-plane mr-2"></i> Submit
        </button>
      </div>
    </div>
  );
}

export default EditorPanel;
