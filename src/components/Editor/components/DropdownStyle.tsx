import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { colors } from "../lib/data";
import { RefObject } from "react";

interface DropdownStyleProps {
  editor: Editor;
  container: RefObject<HTMLDivElement>["current"];
}

const DropdownStyle: React.FC<DropdownStyleProps> = ({ editor, container }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="shrink-0 hover:bg-accent border-none shadow-[none] ring-0 rounded-none py-1 px-2 flex items-center"
          type="button"
        >
          <span
            className="w-5 h-5 flex items-center justify-center rounded-sm select-none"
            style={{
              color: editor.getAttributes("textStyle").color,
              background: editor.getAttributes("highlight").color,
            }}
          >
            A
          </span>{" "}
          <CaretSortIcon className="h-4 w-4 opacity-50 text-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="overflow-hidden z-[9999] h-[500px] p-0"
        container={container}
      >
        <div className="max-h-[500px] custom-scroll overflow-y-auto p-1">
          <DropdownMenuLabel className="text-xxs font-normal py-1">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().unsetColor().run();
            }}
            className="cursor-pointer flex gap-2"
          >
            <span className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300">
              A
            </span>
            Default
          </DropdownMenuItem>
          {colors.map(({ label, value }, idx) => (
            <DropdownMenuItem
              key={`color-${idx}`}
              onClick={() => {
                editor.chain().focus().setColor(value).run();
                editor.chain().focus().unsetHighlight().run();
              }}
              className="cursor-pointer flex gap-2"
            >
              <span
                className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300"
                style={{
                  color: value,
                }}
              >
                A
              </span>
              {label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xxs font-normal py-1">
            BACKGROUND
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().unsetHighlight().run();
            }}
            className="cursor-pointer flex gap-2"
          >
            <span className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300">
              A
            </span>
            Default
          </DropdownMenuItem>
          {colors.map(({ label, value }, idx) => (
            <DropdownMenuItem
              key={`background-${idx}`}
              onClick={() => {
                editor.commands.setHighlight({ color: value });
                editor.chain().focus().unsetColor().run();
              }}
              className="cursor-pointer flex gap-2"
            >
              <span
                className="p-1 border rounded-sm w-6 h-6 text-sm flex items-center justify-center border-gray-300"
                style={{
                  background: value,
                }}
              >
                A
              </span>
              {label}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownStyle;
