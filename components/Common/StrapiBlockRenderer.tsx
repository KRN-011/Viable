"use client";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import React, { ReactNode, ReactElement } from "react";

type InlineChild = {
  type?: "link";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  children?: { text: string }[];
};

interface ReactElementWithContent extends ReactElement {
  props: {
    content?: {
      type?: string;
      url?: string;
      children?: { text: string }[];
    };
  };
}

const extractText = (element: ReactNode): string => {
  if (typeof element === "string") return element;
  if (Array.isArray(element)) return element.map(extractText).join("");
  if (React.isValidElement(element) && element.props?.children) {
    return extractText(element.props.children);
  }
  return "";
};

const getHeadingClass = (level: number): string => {
  const sizeMap: Record<number, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };
  return `font-bold mt-6 mb-4 ${sizeMap[level] || "text-4xl"}`;
};

const renderLink = (
  child: InlineChild | ReactElementWithContent,
  index: number,
  blockType: string = "",
): JSX.Element => {
  let link = "";
  let linkText: string[] = [];

  if (blockType === "list" && "url" in child && child.url && child.children) {
    link = child.url;
    linkText = child.children.map((c) => c.text);
  } else if (React.isValidElement(child)) {
    link = (child as ReactElementWithContent).props?.content?.url || "";
    linkText =
      (child as ReactElementWithContent).props?.content?.children?.map(
        (c) => c.text,
      ) || [];
  }

  return (
    <a
      key={index}
      className="underline hover:text-primary hover:underline dark:hover:text-primary dark:text-white"
      href={link}
    >
      {linkText.join("")}
    </a>
  );
};

const renderChildren = (children: ReactNode): ReactNode[] =>
  React.Children.toArray(children).map((child, index) =>
    React.isValidElement(child) &&
    (child as ReactElementWithContent).props?.content?.type === "link" ? (
      renderLink(child as ReactElementWithContent, index)
    ) : (
      <span key={index}>{child}</span>
    ),
  );

const getTextFromElement = (element: ReactNode): string => {
  if (!element) return "";
  if (typeof element === "string") return element;
  if (Array.isArray(element)) return element.map(getTextFromElement).join("");
  if (React.isValidElement(element) && element.props?.text)
    return element.props.text;
  return "";
};

const renderCodeContent = (children: ReactNode): JSX.Element => {
  try {
    const codeContent = getTextFromElement(children).trim();

    if (codeContent.includes("<video")) {
      const srcMatch = codeContent.match(/src="([^"]+)"/);
      if (srcMatch) {
        return (
          <div className="my-6">
            <video
              src={srcMatch[1]}
              controlsList="nodownload noplaybackrate"
              controls
              disablePictureInPicture
              playsInline
              preload="metadata"
              className="w-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
    }

    return (
      <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
        <code>{codeContent}</code>
      </pre>
    );
  } catch (error) {
    console.error("Error rendering code block:", error);
    return (
      <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
        <code>
          {typeof children === "string" ? children : JSON.stringify(children)}
        </code>
      </pre>
    );
  }
};

interface BlockRendererClientProps {
  readonly content: BlocksContent;
}

export default function BlockRendererClient({
  content,
}: BlockRendererClientProps): JSX.Element | null {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className="mb-4">{renderChildren(children)}</p>
        ),

        heading: ({ children, level }) => {
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag className={getHeadingClass(level)}>
              {renderChildren(children)}
            </HeadingTag>
          );
        },

        list: ({ children, format }) => {
          const ListTag = format === "ordered" ? "ol" : "ul";
          return (
            <ListTag
              className={`${format === "ordered" ? "list-decimal" : "list-disc"} pl-5 mb-4`}
            >
              {React.Children.toArray(children).map((child, index) => {
                if (
                  React.isValidElement(child) &&
                  child.props?.content?.children &&
                  Array.isArray(child.props.content.children)
                ) {
                  const subItems = child.props.content.children;
                  return (
                    <li className={subItems[1] ? "mb-3" : "mb-0"} key={index}>
                      {subItems.map(
                        (subChild: InlineChild, subIndex: number) =>
                          subChild.type === "link" &&
                          subChild.url &&
                          subChild.children ? (
                            renderLink(subChild, subIndex, "list")
                          ) : (
                            <span
                              key={subIndex}
                              className={`${subChild.bold ? "font-bold" : ""} ${subChild.italic ? "italic" : ""}`}
                            >
                              {subChild.text}
                            </span>
                          ),
                      )}
                    </li>
                  );
                }
                return <li key={index}>{child}</li>;
              })}
            </ListTag>
          );
        },

        quote: ({ children }) => (
          <div className="bg-[#F5F7FA] text-foreground dark:bg-[#222530] dark:text-white p-6 md:p-8 rounded-lg">
            <div className="text-6xl text-[#CACFD8]">❝</div>
            <p className="mt-4 text-lg">{renderChildren(children)}</p>
          </div>
        ),

        code: ({ children }) => renderCodeContent(children),
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className="italic">{children}</span>,
        code: ({ children }) => (
          <span className="mt-6 flex items-center space-x-4 rtl:space-x-reverse border-t border-white/30 pt-4">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-primary font-bold text-xl capitalize">
              {extractText(children).charAt(0)}
            </span>
            <span className="flex flex-col">
              <span className="font-bold">{children}</span>
            </span>
          </span>
        ),
      }}
    />
  );
}
