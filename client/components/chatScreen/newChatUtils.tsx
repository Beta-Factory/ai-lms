"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";
import ExampleTheme from "./exampleTheme";
import ToolbarPlugin from "./plugins/toolBarPlugin";
import { cn } from "@/lib/utils";

// const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "Chat Utils Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

interface ChatUtilsInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  placeholder: string;
}

export const ChatUtilsInput = React.forwardRef<
  HTMLTextAreaElement,
  ChatUtilsInputProps
>(({ value, placeholder, ...props }, ref) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className={cn(
          "my-5 mx-auto rounded max-w-lg text-black relative leading-5 font-normal text-left rounded-tl-lg rounded-tr-lg"
        )}
      >
        <ToolbarPlugin />
        <div className="bg-white relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input min-h-[150px] resize-none text-[15px] caret-gray-700 relative tab-size-[1] outline-none p-4 px-2.5"
                value={value}
                aria-placeholder={placeholder}
                placeholder={
                  <div className="text-gray-600 overflow-hidden absolute truncate top-[15px] left-[10px] text-[15px] select-none inline-block pointer-events-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
});
