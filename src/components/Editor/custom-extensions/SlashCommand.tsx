import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
} from "react";
import { Editor, Range, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/Tooltip";
import { slashNodes } from "../lib/slash-command-data";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  tooltipSrc: string;
}

interface Command {
  editor: Editor;
  range: Range;
}

const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const getSuggestionItems = ({ query }: { query: string }) => {
  return slashNodes.filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      return item.title.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });
};

const CommandList = ({
  items,
  command,
}: {
  items: CommandItemProps[];
  command: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [command, items]
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const container = commandListContainer.current;
    const item = selectedButtonRef.current;

    if (item && container) {
      container.scrollTop = item.offsetTop - container.offsetTop;

      item.focus();
    }

    if (selectedIndex === 0 && items.length > 0) {
      setTimeout(() => {
        selectedButtonRef.current?.focus();
      }, 10);
    }
  }, [selectedIndex, items]);

  return items.length > 0 ? (
    <div
      ref={commandListContainer}
      className="file:z-50 h-auto max-h-[330px] w-72 scroll-smooth rounded-md border border-border bg-background shadow-md transition-all overflow-hidden"
    >
      <div className="overflow-y-auto max-h-[330px] px-1 py-2 custom-scroll">
        {items.map((item: CommandItemProps, index: number) => {
          const isSelected = index === selectedIndex;
          return (
            <TooltipProvider
              key={index}
              delayDuration={0}
              disableHoverableContent
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    ref={isSelected ? selectedButtonRef : null}
                    className={cn(
                      `flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-primary hover:bg-accent outline-none`,
                      isSelected && "bg-accent"
                    )}
                    type="button"
                    onClick={() => selectItem(index)}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white overflow-hidden">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-primary/60 dark:text-primary/40">
                        {item.description}
                      </p>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black h-auto flex flex-col max-w-[160px] p-2"
                >
                  <Image
                    src={item.tooltipSrc}
                    alt="text"
                    className="w-[160px] h-[100px] object-cover rounded-sm"
                    width={160}
                    height={100}
                  />
                  <span className="pt-2 text-xs">{item.description}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  ) : null;
};

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});

export default SlashCommand;
