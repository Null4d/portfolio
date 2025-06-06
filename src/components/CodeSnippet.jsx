import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript.min.js";
import defaultAvatar from "../images/icons/avatar.png";

const CodeSnippet = ({
  code,
  language = "typescript",
  username = "@Q1sh0x",
}) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current && code) {
      try {
        Prism.highlightElement(codeRef.current);
      } catch (error) {
        console.warn("Code highlighting failed:", error);
      }
    }
  }, [code, language]);

  if (!code) return null;

  return (
    <div className="flex flex-col mb-8">
      <div className="flex flex-col items-center py-6">
        <div className="flex flex-col justify-between w-full sm:flex-row">
          <div className="flex items-center pb-3 sm:pb-0">
            <img
              className="w-12 h-12 rounded-[50%]"
              src={defaultAvatar}
              alt="avatar"
              onError={(e) => (e.target.src = defaultAvatar)}
            />
            <div className="pl-2">
              <p className="text-primary-5">{username}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border rounded-xl bg-primary-1 border-primary-3">
        <pre style={{ background: "transparent" }}>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

CodeSnippet.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  username: PropTypes.string,
};

export default CodeSnippet;