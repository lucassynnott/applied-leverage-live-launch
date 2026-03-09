import Link from "next/link";
import React, { type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type RichMarkdownProps = {
  source: string;
  className?: string;
};

function SmartLink({
  href = "#",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} rel="noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}

export function RichMarkdown({ source, className }: RichMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          a: ({ children, href, node, ...props }) => {
            void node;
            return (
              <SmartLink href={href} {...props}>
                {children}
              </SmartLink>
            );
          },
          h3: ({ children, node, ...props }) => {
            void node;
            return <h3 {...props}>{children}</h3>;
          },
          h4: ({ children, node, ...props }) => {
            void node;
            return <h4 {...props}>{children}</h4>;
          }
        }}
        remarkPlugins={[remarkGfm]}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
